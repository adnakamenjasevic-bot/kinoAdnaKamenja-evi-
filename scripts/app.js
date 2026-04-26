const podaci = {
    projekcije: [
        {
            film: "Dune: Part Two",
            vrijeme: "20:00",
            sjedista: generisi()
        },
        {
            film: "Avatar 2",
            vrijeme: "18:00",
            sjedista: generisi()
        }
    ]
};

let trenutna = 0;

function generisi() {
    const redovi = ["A","B","C","D","E","F","G","H"];
    let lista = [];

    redovi.forEach(r => {
        for (let i = 1; i <= 10; i++) {
            lista.push({
                red: r,
                broj: i,
                status: random()
            });
        }
    });

    return lista;
}

function random() {
    const s = ["slobodno","zauzeto","rezervisano"];
    return s[Math.floor(Math.random() * 3)];
}
