const cities = [
  "Adana","Adıyaman","Afyonkarahisar","Ağrı","Amasya","Ankara","Antalya","Artvin","Aydın",
  "Balıkesir","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa",
  "Çanakkale","Çankırı","Çorum",
  "Denizli","Diyarbakır",
  "Edirne","Elazığ","Erzincan","Erzurum","Eskişehir",
  "Gaziantep","Giresun","Gümüşhane",
  "Hakkâri","Hatay",
  "Isparta", "İçel (Mersin)", "İstanbul","İzmir",
  "Kars","Kastamonu","Kayseri","Kırklareli","Kırşehir","Kocaeli","Konya","Kütahya",
  "Malatya","Manisa","Kahramanmaraş","Mardin","Muğla","Muş",
  "Nevşehir","Niğde","Ordu",
  "Rize","Sakarya","Samsun","Siirt","Sinop","Sivas",
  "Tekirdağ","Tokat","Trabzon","Tunceli",
  "Şanlıurfa","Uşak","Van","Yozgat","Zonguldak",
  "Aksaray","Bayburt","Karaman","Kırıkkale","Batman","Şırnak","Bartın","Ardahan","Iğdır",
  "Yalova","Karabük","Kilis","Osmaniye","Düzce"
];

const cityAliases = {
  "İçel (Mersin)": ["İçel", "Mersin"]
};

const searchInput = document.getElementById("search");
const suggestionsList = document.getElementById("suggestions");

function normalizeTR(str) {
  return str.toLocaleUpperCase("tr-TR");
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  suggestionsList.innerHTML = "";

  if (query === "") {
    suggestionsList.style.display = "none";
    return;
  }

  const matches = cities.filter(city => {
    const normalizedInput = normalizeTR(query);
    const normalizedCity = normalizeTR(city);

    if (normalizedCity.startsWith(normalizedInput)) {
      return true;
    }

    const aliases = cityAliases[city] || [];
    return aliases.some(alias => normalizeTR(alias).startsWith(normalizedInput));
  });

  if (matches.length === 0) {
    suggestionsList.style.display = "none";
    return;
  }

  matches.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    li.addEventListener("click", () => {
      searchInput.value = city;
      suggestionsList.style.display = "none";
    });
    suggestionsList.appendChild(li);
  });

  suggestionsList.style.display = "block";
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-container")) {
    suggestionsList.style.display = "none";
  }
});
