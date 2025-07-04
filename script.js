// Déclaration des heures de pause pour les avertissements
let heure_debut_pause = "12:00";
let heure_fin_pause = "13:30";

function calculduree() {
    // Récupération de la valeur dans le HTML
    let duree = document.getElementById("input_duree_epreuve").value;
    let heure = document.getElementById("input_horaire_epreuve").value;

    // Séparation de l'heure et des minutes. Création d'une variable durée additionnel du tiers temps
    let duree_epreuve_min = (parseInt(duree.split(":")[0])*60) + parseInt(duree.split(":")[1]);
    let duree_epreuve_tiers_temps_min = Math.round(duree_epreuve_min*(1/3));

    let horaire_epreuve_min = (parseInt(heure.split(":")[0])*60) + parseInt(heure.split(":")[1]);
    let horaire_epreuve_fin = horaire_epreuve_min + duree_epreuve_min
    let horaire_epreuve_tiers_temps_fin = horaire_epreuve_min + duree_epreuve_min + duree_epreuve_tiers_temps_min

    document.getElementById("duree_epreuve_minutes").innerHTML = " === " + duree_epreuve_min+" minutes";

    // Affichage Durée du tiers temps ; Si plus d'une heure affichage H h mm (mm mins)
    document.getElementById("table_duree_tiers_temps").innerHTML = duree_epreuve_tiers_temps_min + " minutes";
    if (duree_epreuve_tiers_temps_min >= 60) {
        document.getElementById("table_duree_tiers_temps").innerHTML = convertMinEnHeure(duree_epreuve_tiers_temps_min, "h") + " (" + duree_epreuve_tiers_temps_min + " mins)";  
    } else {
        document.getElementById("table_duree_tiers_temps").innerHTML = duree_epreuve_tiers_temps_min + " minutes";  
    }

    // Affichage Durée d'épreuve + tiers temps ; Si plus d'une heure affichage H h mm (mm mins)
    let duree_epreuve_tiers_temps_global = duree_epreuve_min + duree_epreuve_tiers_temps_min          
    if (duree_epreuve_tiers_temps_global >= 60) {
        document.getElementById("table_duree_epreuve_et_tiers_temps").innerHTML = convertMinEnHeure(duree_epreuve_tiers_temps_global, "h") + " (" + duree_epreuve_tiers_temps_global + " mins)";  
    } else {
        document.getElementById("table_duree_epreuve_et_tiers_temps").innerHTML = duree_epreuve_tiers_temps_global + " minutes";  
    }

    // Affichages heures de fin
    let heure_fin_epreuve = convertMinEnHeure(horaire_epreuve_fin, ":");
    let heure_fin_epreuve_tiers_temps = convertMinEnHeure(horaire_epreuve_tiers_temps_fin, ":");
    document.getElementById("table_horaire_debut_epreuve").innerHTML = heure;
    document.getElementById("table_horaire_fin_epreuve").innerHTML = heure_fin_epreuve;
    document.getElementById("table_horaire_fin_epreuve_tiers_temps").innerHTML = heure_fin_epreuve_tiers_temps;


    // Mise en surbrillance de avertissement_fin_epreuve ou avertissement_fin_epreuve_tiers_temps si le temps est entre heure_debut_pause et heure_fin_pause
    let avert_fin_epreuve = heure_fin_epreuve.split(':');
    let avert_fin_epreuve_tiers_temps = heure_fin_epreuve_tiers_temps.split(':');

    let avert_fin_epreuve_sec = ((+avert_fin_epreuve[0]) * 60 * 60 + (+avert_fin_epreuve[1]));
    let avert_fin_epreuve_tiers_temps_sec = ((+avert_fin_epreuve_tiers_temps[0]) * 60 * 60 + (+avert_fin_epreuve_tiers_temps[1]));

    let heure_debut_pause_sec = (+heure_debut_pause.split(':')[0]) * 60 * 60 + (+heure_debut_pause.split(':')[1]);
    let heure_fin_pause_sec = (+heure_fin_pause.split(':')[0]) * 60 * 60 + (+heure_fin_pause.split(':')[1]);

    if (avert_fin_epreuve_sec > heure_debut_pause_sec &&  avert_fin_epreuve_sec <= heure_fin_pause_sec) {
        document.getElementById("table_horaire_fin_epreuve").className = "surbrillance"
    } else {
        document.getElementById("table_horaire_fin_epreuve").className = ""
    }

    if (avert_fin_epreuve_tiers_temps_sec >= heure_debut_pause_sec &&  avert_fin_epreuve_tiers_temps_sec <= heure_fin_pause_sec) {
        document.getElementById("table_horaire_fin_epreuve_tiers_temps").className = "surbrillance"
    } else {
        document.getElementById("table_horaire_fin_epreuve_tiers_temps").className = ""
    }
}

// "mode": Affichage en heure ou en durée >> 8:00 ou 8h00
function convertMinEnHeure(minutes, mode) {
    let h = Math.floor(minutes / 60);
    let m = Math.round(minutes % 60);
    m = rectMinutes(m);

    return mode === ":" ? `${h}:${m}` : `${h}h${m}`;
}


// Ajout de "0" quand la minute correspond à 0 ou à un chiffre de longueur 1 (0 à 9) >> 
function rectMinutes(value) {
    if (value < 10) {
        return "0" + value;
    }
    return value;
}


function changeduree(value) {
    document.getElementById("input_duree_epreuve").value = value
    calculduree()
}

function changehoraire(value) {
    document.getElementById("input_horaire_epreuve").value = value
    calculduree()
}