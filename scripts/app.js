const podaci = {
    projekcije: [
        {
            film: "Avatar 2",
            vrijeme: "18:00",
            sjedista: generisiSjedista()
        },
        {
            film: "Dune 2",
            vrijeme: "20:00",
            sjedista: generisiSjedista()
        }
    ]
};

function generisiSjedista() {
    const redovi = ["A","B","C","D","E","F","G","H"];
    let sjedista = [];

    redovi.forEach(red => {
        for (let i = 1; i <= 10; i++) {
            sjedista.push({
                red: red,
                broj: i,
                status: randomStatus()
            });
        }
    });

    return sjedista;
}

function randomStatus() {
    const statusi = ["slobodno", "zauzeto", "rezervisano"];
    return statusi[Math.floor(Math.random() * statusi.length)];
}
