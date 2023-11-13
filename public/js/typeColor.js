const links = document.querySelectorAll('.link');
const types = document.querySelectorAll('.type');

const colorMap = {
    Grass: '#6c9a75',
    Flying: '#faedcd',
    Rock: '#7B6B43',
    Water: '#00b4d8',
    Dragon: '#f43f5e',
    Ground: '#78716c',
    Ghost: '#9046CF',
    Fighting: '#DC602E',
    Electric: '#fbbe24',
    Dark: '#1e293b',
    Fire: '#ef233c',
    Ice: '#50c4e7',
    Bug: '#7CB518',
    Steel: '#a4a4a4',
    Psychic: '#EC9DED',
    Normal: '#D7DEDC',
    Poison: "#66a1b4",
    Fairy: '#f471b5'
}
for (i = 0; i < types.length; i++) {
    const type = types[i];
    const typeName = type.innerText;
    type.style.backgroundColor = colorMap[typeName]
}