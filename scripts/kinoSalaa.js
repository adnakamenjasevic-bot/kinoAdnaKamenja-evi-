let trenutna = 0;

function validacija(podaci) {
    if (!podaci.projekcije || podaci.projekcije.length === 0) {
        return false;
    }

    const validni = ["slobodno", "zauzeto", "rezervisano"];

    for (let p of podaci.projekcije) {
        for (let s of p.sjedista) {
            if (!validni.includes(s.status)) return false;
        }
    }

    return true;
}

function iscrtaj() {
    const container = document.getElementById("sala");
    container.innerHTML = "";

    if (!validacija(podaci)) {
        container.innerHTML = "<p>Podaci nisu validni!</p>";
        return;
    }

    const projekcija = podaci.projekcije[trenutna];

    const info = document.createElement("div");
    info.innerHTML = `
        <h2>${projekcija.film}</h2>
        <p>${projekcija.vrijeme}</p>
    `;
    container.appendChild(info);

    const screen = document.createElement("div");
    screen.className = "screen";
    screen.innerText = "PLATNO";
    container.appendChild(screen);

    const salaDiv = document.createElement("div");
    salaDiv.className = "cinema";

    const redovi = {};

    projekcija.sjedista.forEach(s => {
        if (!redovi[s.red]) redovi[s.red] = [];
        redovi[s.red].push(s);
    });

    for (let red in redovi) {
        const row = document.createElement("div");
        row.className = "row";

        const label = document.createElement("span");
        label.className = "label";
        label.innerText = red;
        row.appendChild(label);

        redovi[red].forEach(sjediste => {
            const seat = document.createElement("div");
            seat.className = "seat " + klasa(sjediste.status);

            seat.onclick = () => {
                if (sjediste.status === "slobodno") {
                    sjediste.status = "rezervisano";
                    iscrtaj();
                }
            };

            row.appendChild(seat);
        });

        salaDiv.appendChild(row);
    }

    container.appendChild(salaDiv);

    // dugmad
    const btnPrev = document.createElement("button");
    btnPrev.innerText = "Prethodna";
    btnPrev.onclick = () => {
        if (trenutna > 0) {
            trenutna--;
            iscrtaj();
        }
    };

    const btnNext = document.createElement("button");
    btnNext.innerText = "Sljedeća";
    btnNext.onclick = () => {
        if (trenutna < podaci.projekcije.length - 1) {
            trenutna++;
            iscrtaj();
        }
    };

    container.appendChild(btnPrev);
    container.appendChild(btnNext);
}

function klasa(status) {
    if (status === "slobodno") return "free";
    if (status === "zauzeto") return "taken";
    return "reserved";
}

window.onload = iscrtaj;
