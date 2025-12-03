const inventors = [
  {
    id: "python",
    language: "Python",
    name: "Guido van Rossum",
    year: 1991,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Guido_van_Rossum_OSCON_2006.jpg",
    bio: "Created Python with an emphasis on readability and simplicity, enabling developers to express ideas with fewer lines of code while maintaining clarity.",
  },
  {
    id: "javascript",
    language: "JavaScript",
    name: "Brendan Eich",
    year: 1995,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Brendan_Eich_Mozilla_Foundation_official_photo.jpg",
    bio: "Invented JavaScript in 10 days for the Netscape browser, enabling interactive experiences on the web and becoming the foundation of modern frontend development.",
  },
  {
    id: "java",
    language: "Java",
    name: "James Gosling",
    year: 1995,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/James_Gosling_2008.jpg",
    bio: "Designed Java at Sun Microsystems with the philosophy of write-once-run-anywhere and a strong focus on stability, tooling, and a robust standard library.",
  },
  {
    id: "c",
    language: "C",
    name: "Dennis Ritchie",
    year: 1972,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Dennis_Ritchie_2011.jpg",
    bio: "Co-creator of C and Unix, laying the groundwork for modern operating systems and influencing nearly every major programming language that followed.",
  },
  {
    id: "cpp",
    language: "C++",
    name: "Bjarne Stroustrup",
    year: 1985,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/BjarneStroustrup.jpg",
    bio: "Extended C with object-oriented and generic programming constructs, aiming for zero-cost abstractions and fine-grained control over performance.",
  },
  {
    id: "ruby",
    language: "Ruby",
    name: "Yukihiro Matsumoto",
    year: 1995,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Yukihiro_Matsumoto.JPG",
    bio: "Designed Ruby to make programmers happy, prioritizing developer ergonomics, elegant syntax, and the principle of least surprise.",
  },
  {
    id: "csharp",
    language: "C#",
    name: "Anders Hejlsberg",
    year: 2000,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Anders_Hejlsberg.jpg",
    bio: "Led the creation of C# at Microsoft, combining the productivity of managed runtimes with strong tooling and modern language features.",
  },
  {
    id: "php",
    language: "PHP",
    name: "Rasmus Lerdorf",
    year: 1995,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Rasmus%20Lerdorf%20August%202014%20(cropped).JPG",
    bio: "Built PHP for dynamic web pages, kickstarting server-side scripting for the web and powering a large share of early internet sites.",
  },
  {
    id: "swift",
    language: "Swift",
    name: "Chris Lattner",
    year: 2014,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Chris%20Lattner%20at%20FOSDEM%202011%20(colorized,%20cropped).jpg",
    bio: "Co-created Swift at Apple to deliver a safe, modern language that pairs performance with approachable syntax for building apps across Apple platforms.",
  },
  {
    id: "go",
    language: "Go",
    name: "Rob Pike",
    year: 2009,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Rob-pike%20(cropped).jpg",
    bio: "Co-designed Go at Google to simplify systems programming with fast builds, straightforward concurrency, and a clean standard library.",
  },
  {
    id: "rust",
    language: "Rust",
    name: "Graydon Hoare",
    year: 2010,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Rust%20programming%20language%20black%20logo.svg",
    alt: "Rust logo",
    bio: "Created Rust to provide memory safety without garbage collection, bringing fearless concurrency and zero-cost abstractions to systems programming.",
  },
  {
    id: "typescript",
    language: "TypeScript",
    name: "Anders Hejlsberg",
    year: 2012,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Anders_Hejlsberg.jpg",
    bio: "Championed TypeScript to add static typing to JavaScript, improving scalability of large codebases while remaining close to the web platform.",
  },
  {
    id: "perl",
    language: "Perl",
    name: "Larry Wall",
    year: 1987,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Larry_Wall_YAPC_2007.jpg",
    bio: "Created Perl as a pragmatic scripting language for text processing and glue code, famous for its flexibility and TIMTOWTDI philosophy.",
  },
  {
    id: "scala",
    language: "Scala",
    name: "Martin Odersky",
    year: 2004,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Mark%20Odersky%20photo%20by%20Linda%20Poeng.jpg",
    bio: "Designed Scala to blend object-oriented and functional programming on the JVM, influencing type systems and reactive frameworks.",
  },
  {
    id: "r",
    language: "R",
    name: "Ross Ihaka & Robert Gentleman",
    year: 1993,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ross%20Ihaka%20(5189180796).jpg",
    bio: "Co-authored R for statistical computing and graphics, empowering data analysis, visualization, and academic research worldwide.",
  },
];

const selectEl = document.getElementById("language-select");
const photoEl = document.getElementById("inventor-photo");
const nameEl = document.getElementById("inventor-name");
const metaEl = document.getElementById("inventor-meta");
const tagEl = document.getElementById("language-tag");
const bioEl = document.getElementById("inventor-bio");
const fallbackImage = "https://placehold.co/640x400/0a0d14/8a5dff?text=Image+unavailable";

function populateSelect() {
  inventors.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.language;
    selectEl.append(option);
  });
}

function updateProfile(id) {
  const chosen = inventors.find((item) => item.id === id);
  if (!chosen) return;

  photoEl.onerror = () => {
    photoEl.onerror = null;
    photoEl.src = fallbackImage;
  };
  photoEl.src = chosen.image;
  photoEl.alt = chosen.alt || `${chosen.name} portrait`;
  nameEl.textContent = chosen.name;
  tagEl.textContent = chosen.language;
  metaEl.textContent = `Introduced: ${chosen.year}`;
  bioEl.textContent = chosen.bio;
}

populateSelect();
selectEl.value = inventors[0].id;
updateProfile(selectEl.value);

selectEl.addEventListener("change", (event) => {
  updateProfile(event.target.value);
});
