export function isDeepSearch<ObjectType extends { [key: string]: any }>(
    obj: ObjectType,
    searchString: string,
    { andDelimiter, exclude, include, keyPrefix, orDelimiter, formatter }: DeepSearchOptions<ObjectType> = {
        andDelimiter: ' ',
        orDelimiter: ',',
        exclude: [],
        include: [],
    },
): boolean {
    const orParts = searchString.split(orDelimiter || ',');

    return Object.keys(obj).some((key) => {
        let nestedKey = key;

        if (typeof keyPrefix === 'string') {
            nestedKey = `${keyPrefix}${key}`;
        }

        // Check include keys
        if (Array.isArray(include) && include.length > 0) {
            if (!include.includes(nestedKey as NestedKeyOf<ObjectType>)) {
                return false;
            }
        }

        // Check exclude keys
        if (Array.isArray(exclude) && exclude.length > 0) {
            if (exclude.includes(nestedKey as NestedKeyOf<ObjectType>)) {
                return false;
            }
        }

        return orParts.some((orPart) => {
            const andParts = orPart.trim().split(andDelimiter || ' ');
            return andParts.every((andPart) => {
                andPart = andPart.trim();
                let value = obj[key];

                if (formatter !== undefined && Object.keys(formatter).includes(nestedKey)) {
                    value = formatter[nestedKey](value);
                }

                if (value === null) {
                    return false;
                }

                switch (typeof value) {
                    case 'undefined':
                        return false;
                    case 'object':
                        const newOptions: DeepSearchOptions<ObjectType> = {
                            andDelimiter,
                            exclude,
                            include,
                            keyPrefix: typeof keyPrefix === 'string' && keyPrefix !== '' ? `${keyPrefix}.${key}` : key,
                            orDelimiter,
                            formatter,
                        };

                        return isDeepSearch(value, searchString, newOptions);
                    case 'boolean':
                        return (
                            ((andPart === 'true' || andPart === '1') && value) ||
                            ((andPart === 'false' || andPart === '0') && !value)
                        );
                    case 'number':
                        return value.toString(10).includes(andPart);
                    case 'string':
                        return value.includes(andPart);
                    case 'function':
                        return false;
                    case 'symbol':
                        return value.toString().includes(andPart);
                    case 'bigint':
                        return value.toString(10).includes(andPart);
                }
            });
        });
    });
}
