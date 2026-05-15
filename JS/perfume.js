/* =========================
   js/perfume.js
========================= */

const params = new URLSearchParams(window.location.search);

const perfumeId = Number(params.get("id"));

/* =========================
   FIND PERFUME
========================= */

const perfume = perfumes.find((item) => item.id === perfumeId);

/* =========================
   DOM
========================= */

const perfumeImage = document.querySelector("#perfumeImage");

const perfumeBrand = document.querySelector("#perfumeBrand");

const perfumeName = document.querySelector("#perfumeName");

const perfumeRating = document.querySelector("#perfumeRating");

const perfumeDescription = document.querySelector("#perfumeDescription");

const perfumeTags = document.querySelector("#perfumeTags");

/* NOTES */

const topNotes = document.querySelector("#topNotes");

const middleNotes = document.querySelector("#middleNotes");

const baseNotes = document.querySelector("#baseNotes");

/* ACCORDS */

const accordBars = document.querySelector("#accordBars");

/* INFO */

const seasonInfo = document.querySelector("#seasonInfo");

const daytimeInfo = document.querySelector("#daytimeInfo");

const longevityInfo = document.querySelector("#longevityInfo");

const sillageInfo = document.querySelector("#sillageInfo");

const similarGrid = document.querySelector(".similar-grid");

const reviewsList = document.querySelector(".reviews-list");

/* =========================
   RENDER
========================= */

if (perfume) {
  perfumeImage.src = perfume.image;

  perfumeImage.alt = perfume.name;

  perfumeBrand.textContent = perfume.brand;

  perfumeName.textContent = perfume.name;

  perfumeRating.textContent = `⭐ ${perfume.rating}`;

  perfumeDescription.textContent = perfume.description;

  /* TAGS */

  perfumeTags.innerHTML = perfume.accords
    .map(
      (tag) => `

      <span>

        ${tag}

      </span>

    `,
    )
    .join("");

  /* NOTES */

  topNotes.innerHTML = perfume.topNotes
    .map(
      (note) => `

      <span class="note-tag">

        ${note}

      </span>

    `,
    )
    .join("");

  middleNotes.innerHTML = perfume.middleNotes
    .map(
      (note) => `

      <span class="note-tag">

        ${note}

      </span>

    `,
    )
    .join("");

  baseNotes.innerHTML = perfume.baseNotes
    .map(
      (note) => `

      <span class="note-tag">

        ${note}

      </span>

    `,
    )
    .join("");

  /* ACCORDS */

  accordBars.innerHTML = perfume.accordBars
    .map(
      (bar) => `

      <div class="accord-bar">

        <div class="accord-header">

          <span>

            ${bar.name}

          </span>

          <span>

            ${bar.strength}%

          </span>

        </div>



        <div class="accord-track">

          <div
            class="accord-fill"
            style="width:${bar.strength}%"
          ></div>

        </div>

      </div>

    `,
    )
    .join("");

  /* INFO */

  seasonInfo.innerHTML = perfume.season
    .map(
      (item) => `

      <span class="info-tag">

        ${item}

      </span>

    `,
    )
    .join("");

  daytimeInfo.innerHTML = perfume.daytime
    .map(
      (item) => `

      <span class="info-tag">

        ${item}

      </span>

    `,
    )
    .join("");

  longevityInfo.innerHTML = `

      <span class="info-tag">

        ${perfume.performance.longevity}

      </span>

    `;

  sillageInfo.innerHTML = `

      <span class="info-tag">

        ${perfume.performance.sillage}

      </span>

    `;

  /* PAGE TITLE */

  document.title = `${perfume.brand} ${perfume.name}`;

  /* =========================
   REVIEWS
========================= */

  perfume.reviews.forEach((review) => {
    const card = document.createElement("div");

    card.classList.add("review-card");

    card.innerHTML = `

    <div class="review-top">


      <div class="review-user">

        <img
          src="${review.avatar}"
          alt="${review.user}"
        >

        <div>
          <h3>

            ${review.user}

          </h3>

          <div class="review-rating">

            ⭐ ${review.rating}/10

          </div>

        </div>

      </div>

      <button class="review-like-btn">

        ♥ ${review.likes}

      </button>

    </div>

    <p class="review-text">

      ${review.text}

    </p>

  `;

    reviewsList.appendChild(card);
  });
}

/* =========================
   SIMILAR PERFUMES
========================= */

const similarPerfumes = perfumes
  .filter((item) => {
    /* not same perfume */

    if (item.id === perfume.id) {
      return false;
    }

    /* same category */

    const sameCategory = item.category.some((cat) =>
      perfume.category.includes(cat),
    );

    /* same accord */

    const sameAccord = item.accords.some((accord) =>
      perfume.accords.includes(accord),
    );

    return sameCategory || sameAccord;
  })

  /* max 4 */

  .slice(0, 4);

/* =========================
   RENDER SIMILAR
========================= */

similarPerfumes.forEach((item) => {
  const card = document.createElement("a");

  card.classList.add("similar-card");

  card.href = `perfume.html?id=${item.id}`;

  card.innerHTML = `

    <div class="similar-image">

      <img
        src="${item.image}"
        alt="${item.name}"
      >

    </div>



    <div class="similar-info">

      <div class="similar-brand">

        ${item.brand}

      </div>



      <h3>

        ${item.name}

      </h3>



      <div class="similar-rating">

        ⭐ ${item.rating}

      </div>

    </div>

  `;

  similarGrid.appendChild(card);
});
