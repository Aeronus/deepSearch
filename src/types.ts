type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
        ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
        : `${Key}`;
}[keyof ObjectType & (string | number)];

type DeepSearchOptions<ObjectType extends object> = {
    include?: NestedKeyOf<ObjectType>[];
    exclude?: NestedKeyOf<ObjectType>[];
    formatter?: { [key: string]: (data: unknown) => string };
    andDelimiter?: string;
    orDelimiter?: string;
    keyPrefix?: string;
};
