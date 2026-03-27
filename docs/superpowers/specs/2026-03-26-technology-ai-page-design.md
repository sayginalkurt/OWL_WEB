# Technology & AI page redesign (Technology route)

## Goal

Redesign the `Technology` page to feel **editorial / authority-first** (“Paper & Ink”), improving hierarchy, readability, and narrative flow while keeping content bilingual (via existing locale routing). Add **logo row placeholders** (assets will be provided later).

## Non-goals

- No new CMS modeling or content sourcing changes.
- No real logo assets yet (placeholders only).
- No major global theme overhaul; changes should be page-scoped unless a tiny shared utility is clearly reusable.

## Information architecture (single page)

## Source of truth (current implementation)

- Page file: `src/app/[locale]/technology/page.tsx`
- The **6 pillars** and “Our Research Methodology” step grid are currently hardcoded in that file; the redesign should preserve their meaning while improving layout/styling.

### 1) Hero (single H1)

- **Eyebrow**: “Technology” (badge is ok)
- **H1**: “Technology, AI, and Data Infrastructure”
- **Lead** (EN):
  - “At OWL Intelligence, technology is not an add-on to research. It is the core infrastructure behind how we collect, validate, structure, analyze, and activate data. We bring together advanced AI systems, cloud-based architecture, trusted external databases, and production-ready software tools to turn raw information into reliable intelligence.”
- **Lead** (TR):
  - “OWL Intelligence’ta teknoloji, araştırmanın üzerine eklenen bir unsur değil; veriyi toplama, doğrulama, yapılandırma, analiz etme ve içgörüye dönüştürme sürecimizin temel altyapısıdır. Gelişmiş yapay zekâ sistemlerini, bulut tabanlı veri mimarisini, güvenilir dış veri kaynaklarını ve üretime hazır yazılım araçlarını bir araya getiriyoruz.”

### 2) Narrative sections (3 blocks, each followed by a logo band)

#### Heading/outline semantics

- Document outline:
  - `h1`: page title
  - `h2`: each narrative block (AI partners / Engineering stack / Trusted sources)
  - `h2`: Capabilities section
  - `h2`: Methodology section
- Each logo band sits inside its parent narrative block and uses an `h3` label (visually subtle).

#### 2.1 AI partners

- **Heading** (localized):
  - EN: “AI Partners”
  - TR: “Yapay Zekâ Ortakları”
- **Body** (EN):
  - “On the AI side, we work with leading models and tools from globally trusted technology partners such as OpenAI, Google Gemini, and Anthropic. These systems support analysis, classification, summarization, anomaly detection, data interpretation, and intelligent interface design across our workflow.”
- **Body** (TR):
  - “Yapay zekâ tarafında OpenAI, Google Gemini ve Anthropic gibi küresel teknoloji ortaklarının sunduğu öncü modellerden yararlanıyoruz. Bu sistemler; analiz, sınıflandırma, özetleme, anomali tespiti, veri yorumlama ve akıllı arayüz tasarımı gibi birçok alanda iş akışımızı destekliyor.”
- **Logo band label** (localized):
  - EN: “Model providers”
  - TR: “Model sağlayıcıları”
- **Logo band placeholder items**: OpenAI / Gemini / Anthropic

#### 2.2 Engineering stack

- **Heading** (localized):
  - EN: “Product & Engineering”
  - TR: “Ürün ve Mühendislik”
- **Body** (EN):
  - “On the product and engineering side, we build secure, flexible, and scalable platforms using modern technologies such as Supabase, Next.js, Railway, and Sanity. This stack allows us to deliver high-performance digital products that are both operationally robust and ready for institutional use.”
- **Body** (TR):
  - “Ürün ve mühendislik tarafında ise Supabase, Next.js, Railway ve Sanity gibi modern teknolojilerle güvenli, esnek ve ölçeklenebilir platformlar geliştiriyoruz. Bu yapı, hem yüksek performanslı hem de kurumsal kullanıma uygun dijital çözümler sunmamızı sağlıyor.”
- **Logo band label** (localized):
  - EN: “Stack”
  - TR: “Teknoloji yığını”
- **Logo band placeholder items**: Supabase / Next.js / Railway / Sanity

#### 2.3 Trusted sources

- **Heading** (localized):
  - EN: “Trusted External Sources”
  - TR: “Güvenilir Dış Kaynaklar”
- **Body** (EN):
  - “Our systems are designed to combine proprietary field data with trusted national and international sources such as the IMF, CBRT (TCMB), TurkStat (TÜİK), the World Bank, Eurostat, and the OECD. This enables us to provide insights that are not only data-driven, but also contextual, comparable, and decision-ready.”
- **Body** (TR):
  - “Sistemlerimizi, özgün saha verisini IMF, TCMB, TÜİK, Dünya Bankası, Eurostat ve OECD gibi güvenilir ulusal ve uluslararası veri kaynaklarıyla birleştirecek şekilde kurguluyoruz. Böylece kurumlara, yalnızca veri değil; bağlamı güçlü, karşılaştırılabilir ve karar almaya uygun içgörüler sunuyoruz.”
- **Logo band label** (localized):
  - EN: “Data sources”
  - TR: “Veri kaynakları”
- **Logo band placeholder items**: IMF / TCMB / TÜİK / World Bank / Eurostat / OECD

### 3) Capabilities (“Technology & AI” + 6 pillars)

- **Section heading** (localized):
  - EN: “Technology & AI”
  - TR: “Teknoloji ve Yapay Zekâ”
- **Section lead** (localized):
  - EN: “Our technology stack combines rigorous field research methodology with advanced AI to deliver intelligence products that are grounded, transparent, and commercially valuable.”
  - TR: “Teknoloji altyapımız, saha araştırmasının metodolojik gücünü gelişmiş yapay zekâ ile birleştirerek; temeli sağlam, şeffaf ve ticari değeri yüksek içgörü ürünleri sunar.”
- **Pillars** (localized titles + descriptions):
  1. **Authentic Field Data**
     - TR title: “Otantik Saha Verisi”
     - EN description: “Our foundation is real-world field research — structured surveys, interviews, and observational data collected across Turkiye and beyond. Unlike scraped or synthetic data, our datasets reflect verified human behavior and sentiment.”
     - TR description: “Temelimiz, Türkiye ve ötesinde yürütülen gerçek saha araştırmasıdır — yapılandırılmış anketler, görüşmeler ve gözlemsel veri toplama. Kazınmış (scraped) ya da sentetik veriden farklı olarak veri setlerimiz, doğrulanmış insan davranışı ve duyarlılığını yansıtır.”
  2. **Proprietary Methodology (FWBM)**
     - TR title: “Özgün Metodoloji (FWBM)”
     - EN description: “The Field-Weighted Barometer Model (FWBM) uses a proprietary weighting methodology that adjusts for demographic representation, regional variation, and temporal consistency — ensuring statistically robust, commercially relevant indicators.”
     - TR description: “Field-Weighted Barometer Model (FWBM), demografik temsiliyeti, bölgesel farklılıkları ve zamansal tutarlılığı dikkate alan özgün bir ağırlıklandırma yöntemi kullanır — istatistiksel olarak sağlam ve ticari açıdan anlamlı göstergeler üretir.”
  3. **AI-Powered Analysis (Monet)**
     - TR title: “Yapay Zekâ Destekli Analiz (Monet)”
     - EN description: “Our AI layer (Monet) interprets complex datasets, detects emerging trends, generates natural-language insights, and powers our interactive agent — making intelligence accessible to decision-makers at every level.”
     - TR description: “Yapay zekâ katmanımız Monet; karmaşık veri setlerini yorumlar, yükselen eğilimleri tespit eder, doğal dilde içgörüler üretir ve etkileşimli ajanımızı çalıştırır — içgörüyü her seviyedeki karar verici için erişilebilir kılar.”
  4. **Fuzzy Cognitive Mapping (FuzzyOwl)**
     - TR title: “Bulanık Bilişsel Haritalama (FuzzyOwl)”
     - EN description: “FuzzyOwl applies Fuzzy Cognitive Map (FCM) theory to model complex causal systems. This mathematical framework captures expert knowledge as weighted directed graphs and supports scenario simulation for strategic planning.”
     - TR description: “FuzzyOwl, karmaşık nedensel sistemleri modellemek için Fuzzy Cognitive Map (FCM) yaklaşımını uygular. Bu matematiksel çerçeve, uzman bilgisini ağırlıklı yönlü grafikler olarak temsil eder ve stratejik planlama için senaryo simülasyonunu destekler.”
  5. **Data Integrity & Governance**
     - TR title: “Veri Bütünlüğü ve Yönetişim”
     - EN description: “We maintain rigorous data governance — from collection protocols and quality assurance to secure storage and compliant processing. Our data pipeline is designed for auditability and transparency.”
     - TR description: “Toplama protokollerinden kalite güvenceye, güvenli depolamadan uyumlu işleme süreçlerine kadar sıkı bir veri yönetişimi uygularız. Veri hattımız denetlenebilirlik ve şeffaflık için tasarlanmıştır.”
  6. **Multi-Language Intelligence**
     - TR title: “Çok Dilli İçgörü”
     - EN description: “Our platform operates natively in English and Turkish, with content, analysis, and AI interactions available in both languages — supporting cross-market intelligence for international stakeholders.”
     - TR description: “Platformumuz İngilizce ve Türkçe dillerinde yerel olarak çalışır; içerik, analiz ve yapay zekâ etkileşimleri her iki dilde de sunulur — uluslararası paydaşlar için çapraz pazar içgörüsünü destekler.”

### 4) Methodology (existing step grid, restyled)

- Keep the existing block but localize strings:
  - EN heading: “Our Research Methodology”
  - TR heading: “Araştırma Metodolojimiz”
  - EN lead: “OWL Intelligence products are built on a multi-stage research process that ensures data quality, statistical validity, and commercial relevance at every step.”
  - TR lead: “OWL Intelligence ürünleri; veri kalitesini, istatistiksel geçerliliği ve ticari relevansı her aşamada güvence altına alan çok aşamalı bir araştırma süreci üzerine kuruludur.”
  - Steps (localized):
    - 01 EN: Design — “Survey and research design with sampling strategy”
    - 01 TR: Tasarım — “Örnekleme stratejisiyle anket ve araştırma tasarımı”
    - 02 EN: Collect — “Field data collection with quality controls”
    - 02 TR: Toplama — “Kalite kontrolleriyle saha verisi toplama”
    - 03 EN: Process — “Cleaning, weighting, and statistical analysis”
    - 03 TR: İşleme — “Temizleme, ağırlıklandırma ve istatistiksel analiz”
    - 04 EN: Deliver — “AI-enhanced insights and interactive dashboards”
    - 04 TR: Sunum — “Yapay zekâ destekli içgörüler ve etkileşimli paneller”
- Re-style to match Paper & Ink (lighter borders, less “app-card” feel).

## Visual direction: “Paper & Ink”

### Palette & surfaces

- Background: warm off-white (“paper”) surface.
- Hairline borders: low-contrast strokes.
- Accents: use existing `primary` sparingly (e.g. eyebrow, subtle rules, small callouts).
- Optional subtle paper grain via CSS background (page-scoped).

### Theme compatibility

- Site has a theme toggle; page must remain readable in both themes.
- Paper grain/texture must be **disabled or significantly reduced in dark mode** to avoid contrast noise.

### Typography & hierarchy

- Strong H1 + comfortable line length for long paragraphs.
- Section headings: editorial scale; clear rhythm between heading → lead → body.
- Body: increase line-height; avoid dense blocks.

### Motion

- Restrained: gentle fade/translate on section entrance is OK if site already uses it; avoid flashy effects.

## Logo band placeholder spec

Implement as a reusable local component on the page:

- Layout: **semantic list** with `ul > li`, rendered as **flex-wrap** with a minimum item width so it naturally becomes ~2 columns on small screens.
- Each logo placeholder item:
  - visible text label (e.g. “OpenAI”) (no aria-only labels)
  - consistent height (target 40–44px)
  - optional small square “mark” placeholder
- Accessibility:
  - each band is a `<section>` with a heading (`h3`) and `aria-labelledby`
  - list uses normal text contrast; no brand marks until assets are provided

## Responsive behavior

- Mobile:
  - Hero stays single column.
  - Narrative blocks stacked; logo bands wrap into 2 columns where possible.
  - Pillars: 1 column.
- Tablet: pillars 2 columns.
- Desktop: pillars 3 columns; maintain readable max width for paragraphs (don’t span full 7xl).

## Implementation notes (files)

- Primary: `src/app/[locale]/technology/page.tsx`
- Reuse existing UI primitives (`Card`, `Badge`) where they match; introduce page-scoped styling in markup/classes.

## i18n implementation requirement

- The repo already uses `next-intl` with JSON messages loaded from `messages/{locale}.json` via `src/i18n/request.ts`.
- Add a new messages namespace, e.g. `technologyPage`, in:
  - `messages/en.json`
  - `messages/tr.json`
- Follow the project’s existing pattern (e.g. `src/app/[locale]/products/page.tsx`) by using:
  - `import { useTranslations } from "next-intl";`
  - `const t = useTranslations("technologyPage");`
- Locale routing remains as-is (`/en/...`, `/tr/...`); no separate “default language” logic needed beyond existing routing.

### Stable keys / IDs

- Pillars should have stable IDs (not English titles) for:
  - React keys
  - translation keys
- Recommended IDs:
  - `authenticFieldData`
  - `proprietaryMethodology`
  - `aiPoweredAnalysis`
  - `fuzzyCognitiveMapping`
  - `dataIntegrityGovernance`
  - `multiLanguageIntelligence`

