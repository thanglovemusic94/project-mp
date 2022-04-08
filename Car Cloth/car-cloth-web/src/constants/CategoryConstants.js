import { BlackBox, GlassFilm, NewCarPackage, Polish, PPF, Tinting, Windshield, Wrapping } from "../assets/svgs/CategoryIcons"

export const Category = {
    BlackBox: "블랙박스",
    GlassFilm: "유리막",
    NewCarPackage: "신차패키지",
    Polish: "광택",
    PPF: "PPF",
    Tinting: "썬팅",
    Windshield: "윈드쉴드",
    Wrapping: "랩핑",
}

export function getIcon(title) {
    if(title === Category.BlackBox) return <BlackBox />
    if(title === Category.GlassFilm) return <GlassFilm />
    if(title === Category.NewCarPackage) return <NewCarPackage />
    if(title === Category.Polish) return <Polish />
    if(title === Category.PPF) return <PPF />
    if(title === Category.Tinting) return <Tinting />
    if(title === Category.Windshield) return <Windshield />
    if(title === Category.Wrapping) return <Wrapping />
}