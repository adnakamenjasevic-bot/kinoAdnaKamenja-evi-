function prikazi() {
    const sala = document.getElementById("sala");
    sala.innerHTML = "";

    const p = podaci.projekcije[trenutna];

    // update header
    document.getElementById("film").innerText = p.film;
    document.getElementById("vrijeme").innerText = p.vrijeme;

    const redovi = {};

    p.sjedista.forEach(s => {
        if (!redovi[s.red]) redovi[s.red] = [];
        redovi[s.red].push(s);
    });

    for (let r in redovi) {
        const row = document.createElement("div");
        row.className = "row";

        const label = document.createElement("span");
        label.className = "label";
        label.innerText = r;
        row.appendChild(label);

        redovi[r].forEach(s => {
            const seat = document.createElement("div");
            seat.className = "seat";

            if (s.status === "slobodno") seat.classList.add("free");
            if (s.status === "zauzeto") seat.classList.add("taken");
            if (s.status === "rezervisano") seat.classList.add("reserved");

            seat.onclick = () => {
                if (s.status === "slobodno") {
                    s.status = "rezervisano";
                    prikazi();
                }
            };

            row.appendChild(seat);
        });

        sala.appendChild(row);
    }

    // dugmad
    const prev = document.createElement("button");
    prev.innerText = "Prethodna";
    prev.onclick = () => {
        if (trenutna > 0) {
            trenutna--;
            prikazi();
        }
    };

    const next = document.createElement("button");
    next.innerText = "Sljedeća";
    next.onclick = () => {
        if (trenutna < podaci.projekcije.length - 1) {
            trenutna++;
            prikazi();
        }
    };

    sala.appendChild(prev);
    sala.appendChild(next);
}

prikazi();
