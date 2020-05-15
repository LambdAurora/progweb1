// Images
Array.from(document.getElementsByClassName("image")).forEach(image => {
    // On récupère la description dans les enfants du div de l'image.
    let description = Array.from(image.children).find(child => child.className.includes("description"));
    // Et on ajoute les events.
    image.addEventListener("mouseover", _ => description.style.display = "inline");
    image.addEventListener("mouseout", _ => description.style.display = "none");
});

// Objets
function make_text_element(element, text) {
    let result = document.createElement(element);
    result.appendChild(document.createTextNode(text));
    return result;
}

class Cours {
    constructor(name, class_name, type, content) {
        this.name = name;
        this.class_name = class_name;
        this.type = type;
        this.content = content;
    }

    render(parent) {
        let name = make_text_element("h3", this.name);
        let class_name = make_text_element("span", this.class_name);
        let type = make_text_element("span", this.type);
        let content = document.createElement("p");
        content.innerHTML = this.content;

        parent.innerHTML = "";
        // Name
        parent.appendChild(name);
        // Data div
        let info_div = document.createElement("div");
        info_div.className = "class_data";
        info_div.appendChild(class_name);
        info_div.appendChild(make_text_element("span", " - "))
        info_div.appendChild(type);
        parent.appendChild(info_div);
        // Content
        parent.appendChild(content);
    }
}

let cours_a = new Cours("Javascript Vanilla Partie 2", "ProgWeb1", "Cours", "◉ Objects = data (properties) + functions (methods)<br/>◉ Handy way of representing things<br/>◉ Properties: <code>key: value</code>");
cours_a.render(document.getElementById("cours_a"));
let cours_b = new Cours("ES6 Objet", "Javascript", 
"Documentation", "Depuis ES6 il y a une façon plus claire de déclarer un objet et un constructeur avec les mots clés <code>class</code> et <code>constructor</code>, les méthodes sont définis en dehors du constructeur avec cette nouvelle notation.");
cours_b.render(document.getElementById("cours_b"));

// Form
const form_cours_name = document.getElementById("cours_name");
const form_cours_class_name = document.getElementById("cours_class_name");
const form_cours_type = document.getElementById("cours_type");
const form_cours_content = document.getElementById("cours_content");
const cours_custom = document.getElementById("cours_custom");

document.getElementById("cours_submit").addEventListener("click", _ => {
    let result = new Cours(form_cours_name.value, form_cours_class_name.value, form_cours_type.value, form_cours_content.value);
    result.render(cours_custom);
});
