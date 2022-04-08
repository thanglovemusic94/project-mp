export const ConstructableTypes = [
    { label: "블랙박스", prop: "blackBox" },
    { label: "유리막", prop: "glassFilm" },
    { label: "신차패키지", prop: "newCarPackage" },
    { label: "광택", prop: "polish" },
    { label: "PPF", prop: "ppf" },
    { label: "썬팅", prop: "tinting" },
    { label: "윈드쉴드", prop: "windShield" },
    { label: "랩핑", prop: "wrapping" }
]

export const getLabelConstructableTypes = (prop) => {
    const check = ConstructableTypes.filter(value => value.prop === prop)
    return check[0].label
}