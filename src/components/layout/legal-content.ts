"use client";

export type LegalDocumentKey = "privacy" | "terms";

type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type LegalDocument = {
  label: string;
  eyebrow: string;
  title: string;
  summary: string;
  sections: LegalSection[];
};

type CookieConsentCopy = {
  badge: string;
  title: string;
  body: string;
  accept: string;
  privacyLabel: string;
  termsLabel: string;
};

type LegalCopy = {
  companyName: string;
  privacy: LegalDocument;
  terms: LegalDocument;
  cookie: CookieConsentCopy;
};

const legalContent: Record<"en" | "tr", LegalCopy> = {
  en: {
    companyName: "OWL Intelligence A.Ş.",
    privacy: {
      label: "Privacy Policy",
      eyebrow: "Legal",
      title: "Privacy Policy",
      summary:
        "This policy explains which information OWL Intelligence A.Ş. may collect through this website, why we use it, and how we handle it in a measured and secure way.",
      sections: [
        {
          title: "1. Scope",
          paragraphs: [
            "This Privacy Policy applies to the OWL Intelligence website, its contact channels, and related digital interactions that refer to this policy.",
            "By using the website or submitting information to us, you acknowledge that your information may be processed as described here.",
          ],
        },
        {
          title: "2. Information We May Collect",
          paragraphs: [
            "We may collect information that you provide directly, including your name, work email address, institution or company name, and any details you share through contact forms or email.",
            "We may also collect limited technical information that helps us operate and improve the website, such as browser type, device type, pages visited, approximate usage patterns, and your cookie-consent preference.",
          ],
          bullets: [
            "Contact and enquiry details you submit voluntarily",
            "Correspondence you send to us",
            "Basic analytics and device information used to understand site performance",
          ],
        },
        {
          title: "3. How We Use Information",
          paragraphs: [
            "We use personal information to respond to enquiries, provide product or partnership information, manage institutional conversations, improve the clarity and performance of the site, and maintain the security of our systems.",
            "We do not sell personal information. We use information in ways that are proportionate to our business relationship with you and to the operation of the website.",
          ],
        },
        {
          title: "4. Cookies and Similar Technologies",
          paragraphs: [
            "This website may use essential cookies and limited analytics-related storage to keep the site functioning properly, remember basic preferences, and understand how visitors use the site.",
            "Where consent is required, non-essential cookies or similar technologies will only be used after you accept them through the site banner.",
          ],
        },
        {
          title: "5. Sharing and Service Providers",
          paragraphs: [
            "We may share information with carefully selected service providers that help us host the website, process communications, or maintain our technical infrastructure. These providers may access information only to the extent necessary to perform their services for us.",
            "We may also disclose information where required by law, regulation, court order, or to protect our rights, users, or systems.",
          ],
        },
        {
          title: "6. Retention and Security",
          paragraphs: [
            "We retain information only for as long as reasonably necessary for the purpose for which it was collected, including responding to enquiries, maintaining records, and complying with legal or operational obligations.",
            "We use reasonable technical and organizational measures to protect the information we hold. However, no internet transmission or storage system can be guaranteed to be fully secure.",
          ],
        },
        {
          title: "7. Your Choices and Contact",
          paragraphs: [
            "You may contact us to request access to, correction of, or deletion of information you have provided to us, subject to applicable law and legitimate business requirements.",
            "For privacy-related questions, please contact OWL Intelligence through the contact channels published on this website.",
          ],
        },
      ],
    },
    terms: {
      label: "Terms of Use",
      eyebrow: "Legal",
      title: "Terms of Use",
      summary:
        "These Terms of Use govern access to and use of the OWL Intelligence website. They are intended to protect both users and the integrity of the information and systems presented here.",
      sections: [
        {
          title: "1. Acceptance",
          paragraphs: [
            "By accessing or using this website, you agree to these Terms of Use. If you do not agree, please do not use the website.",
            "We may update these terms from time to time. Continued use of the website after changes are published means you accept the updated version.",
          ],
        },
        {
          title: "2. Permitted Use",
          paragraphs: [
            "You may use this website for lawful, professional, informational, and evaluation purposes related to OWL Intelligence and its products and services.",
          ],
          bullets: [
            "Do not misuse the website or interfere with its operation",
            "Do not attempt unauthorized access to systems, data, or services",
            "Do not copy, reproduce, or republish protected materials in a misleading or unlawful way",
          ],
        },
        {
          title: "3. Intellectual Property",
          paragraphs: [
            "Unless otherwise stated, the content, branding, visual materials, text, graphics, and underlying structure of this website are owned by or licensed to OWL Intelligence A.Ş.",
            "No right, title, or license is granted except for the limited right to view the site for legitimate business purposes.",
          ],
        },
        {
          title: "4. Information and Availability",
          paragraphs: [
            "We aim to keep the website accurate, current, and available, but we do not guarantee that all content is complete, error-free, or uninterrupted at all times.",
            "Product descriptions, availability, and service details may change without prior notice as our work evolves.",
          ],
        },
        {
          title: "5. Third-Party Links and Services",
          paragraphs: [
            "This website may contain links to third-party websites or services for convenience. We are not responsible for the content, policies, or practices of third-party services.",
            "Using external links is at your own discretion and subject to the terms of those third parties.",
          ],
        },
        {
          title: "6. Liability",
          paragraphs: [
            "To the fullest extent permitted by applicable law, OWL Intelligence A.Ş. shall not be liable for indirect, incidental, consequential, or business interruption losses arising from the use of, or inability to use, this website.",
            "Nothing in these terms excludes liability that cannot lawfully be excluded under applicable law.",
          ],
        },
        {
          title: "7. Contact",
          paragraphs: [
            "If you have questions about these terms or need permission regarding the use of content, please contact us through the channels listed on this website.",
          ],
        },
      ],
    },
    cookie: {
      badge: "Cookie Notice",
      title: "We use cookies to keep the experience clear and reliable.",
      body:
        "We use essential cookies and limited analytics-related storage to operate the site, remember basic preferences, and understand overall usage patterns. You can review the details in our Privacy Policy and Terms of Use.",
      accept: "Accept Cookies",
      privacyLabel: "Privacy Policy",
      termsLabel: "Terms of Use",
    },
  },
  tr: {
    companyName: "OWL Intelligence A.Ş.",
    privacy: {
      label: "Gizlilik Politikası",
      eyebrow: "Yasal",
      title: "Gizlilik Politikası",
      summary:
        "Bu politika, OWL Intelligence A.Ş.'nin bu internet sitesi üzerinden hangi bilgileri toplayabileceğini, bu bilgileri neden kullandığını ve bunları hangi çerçevede işlediğini açıklar.",
      sections: [
        {
          title: "1. Kapsam",
          paragraphs: [
            "Bu Gizlilik Politikası, OWL Intelligence internet sitesini, iletişim kanallarını ve bu politikaya atıf yapan ilgili dijital etkileşimleri kapsar.",
            "Siteyi kullanmanız veya bize bilgi iletmeniz halinde, bilgilerinizin burada açıklandığı şekilde işlenebileceğini kabul etmiş olursunuz.",
          ],
        },
        {
          title: "2. Toplayabileceğimiz Bilgiler",
          paragraphs: [
            "Bize doğrudan sağladığınız ad, kurumsal e-posta adresi, kurum veya şirket adı ve iletişim formları ya da e-posta yoluyla paylaştığınız bilgiler gibi verileri toplayabiliriz.",
            "Ayrıca siteyi işletmek ve geliştirmek amacıyla tarayıcı türü, cihaz türü, ziyaret edilen sayfalar, genel kullanım örüntüleri ve çerez onayı tercihiniz gibi sınırlı teknik veriler de işleyebiliriz.",
          ],
          bullets: [
            "Gönüllü olarak paylaştığınız iletişim ve talep bilgileri",
            "Bize gönderdiğiniz yazışmalar",
            "Site performansını anlamak için kullanılan temel analiz ve cihaz bilgileri",
          ],
        },
        {
          title: "3. Bilgileri Nasıl Kullanırız",
          paragraphs: [
            "Kişisel bilgileri; taleplerinize yanıt vermek, ürün ve iş birliği bilgisi paylaşmak, kurumsal görüşmeleri yönetmek, sitenin açıklığını ve performansını geliştirmek ve sistem güvenliğini sürdürmek amacıyla kullanırız.",
            "Kişisel verileri satmayız. Bilgileri, sizinle kurduğumuz ilişki ve sitenin işletilmesi için gerekli ölçüde ve orantılı şekilde kullanırız.",
          ],
        },
        {
          title: "4. Çerezler ve Benzeri Teknolojiler",
          paragraphs: [
            "Bu internet sitesi, sitenin düzgün çalışması, temel tercihlerin hatırlanması ve ziyaretçilerin genel kullanım davranışlarının anlaşılması için zorunlu çerezler ve sınırlı analiz amaçlı depolama teknolojileri kullanabilir.",
            "Onayın gerekli olduğu durumlarda, zorunlu olmayan çerezler veya benzeri teknolojiler ancak sitedeki bildirim üzerinden kabul etmenizden sonra kullanılır.",
          ],
        },
        {
          title: "5. Paylaşım ve Hizmet Sağlayıcılar",
          paragraphs: [
            "Bilgileri; site barındırma, iletişim süreçleri veya teknik altyapı hizmetleri sağlayan ve bizim adımıza çalışan sınırlı sayıdaki hizmet sağlayıcıyla paylaşabiliriz. Bu hizmet sağlayıcılar, yalnızca görevlerini yerine getirmek için gerekli ölçüde erişim elde eder.",
            "Ayrıca yasal zorunluluk, düzenleyici talep, mahkeme kararı veya haklarımızı, kullanıcılarımızı ya da sistemlerimizi koruma ihtiyacı söz konusu olduğunda bilgi açıklayabiliriz.",
          ],
        },
        {
          title: "6. Saklama ve Güvenlik",
          paragraphs: [
            "Bilgileri; toplanma amacıyla makul ölçüde bağlantılı olduğu süre boyunca, taleplere yanıt verme, kayıt tutma ve yasal ya da operasyonel yükümlülükleri yerine getirme amaçları doğrultusunda saklarız.",
            "Sahip olduğumuz bilgileri korumak için makul teknik ve organizasyonel önlemler uygularız. Bununla birlikte, internet üzerinden hiçbir aktarım veya depolama sistemi tamamen güvenli olarak garanti edilemez.",
          ],
        },
        {
          title: "7. Haklarınız ve İletişim",
          paragraphs: [
            "Yürürlükteki mevzuat ve meşru iş gereklilikleri çerçevesinde, bize ilettiğiniz bilgilere erişim, düzeltme veya silme talebinde bulunabilirsiniz.",
            "Gizlilikle ilgili sorularınız için internet sitesinde yer alan iletişim kanalları üzerinden OWL Intelligence ile iletişime geçebilirsiniz.",
          ],
        },
      ],
    },
    terms: {
      label: "Kullanım Koşulları",
      eyebrow: "Yasal",
      title: "Kullanım Koşulları",
      summary:
        "Bu Kullanım Koşulları, OWL Intelligence internet sitesine erişimi ve kullanımını düzenler. Amaç, hem kullanıcıları hem de burada sunulan bilgi ve sistemlerin bütünlüğünü korumaktır.",
      sections: [
        {
          title: "1. Kabul",
          paragraphs: [
            "Bu internet sitesine erişerek veya siteyi kullanarak bu Kullanım Koşulları'nı kabul etmiş olursunuz. Kabul etmiyorsanız lütfen siteyi kullanmayın.",
            "Bu koşulları zaman zaman güncelleyebiliriz. Değişikliklerin yayımlanmasından sonra siteyi kullanmaya devam etmeniz, güncel koşulları kabul ettiğiniz anlamına gelir.",
          ],
        },
        {
          title: "2. İzin Verilen Kullanım",
          paragraphs: [
            "Bu internet sitesini, OWL Intelligence ve ürünleri ya da hizmetleri hakkında hukuka uygun, profesyonel, bilgilendirici ve değerlendirme amaçlı kullanabilirsiniz.",
          ],
          bullets: [
            "Siteyi kötüye kullanmayın veya işleyişini bozmayın",
            "Sistemlere, verilere veya hizmetlere yetkisiz erişim girişiminde bulunmayın",
            "Korunan içerikleri yanıltıcı veya hukuka aykırı şekilde kopyalamayın, çoğaltmayın ya da yeniden yayımlamayın",
          ],
        },
        {
          title: "3. Fikri Mülkiyet",
          paragraphs: [
            "Aksi belirtilmedikçe, bu internet sitesindeki içerik, marka öğeleri, görsel materyaller, metinler, grafikler ve temel yapı OWL Intelligence A.Ş.'ye aittir veya lisanslı olarak kullanılmaktadır.",
            "Burada, meşru iş amaçları doğrultusunda siteyi görüntüleme hakkı dışında herhangi bir hak, mülkiyet veya lisans tanınmaz.",
          ],
        },
        {
          title: "4. Bilgi İçeriği ve Erişilebilirlik",
          paragraphs: [
            "Sitenin doğru, güncel ve erişilebilir olmasını amaçlarız; ancak tüm içeriğin her zaman eksiksiz, hatasız veya kesintisiz olacağını garanti etmeyiz.",
            "Ürün açıklamaları, erişilebilirlik ve hizmet detayları, çalışmalarımız geliştikçe önceden bildirim yapılmaksızın değişebilir.",
          ],
        },
        {
          title: "5. Üçüncü Taraf Bağlantıları ve Hizmetler",
          paragraphs: [
            "Bu internet sitesi, kolaylık sağlamak amacıyla üçüncü taraf internet sitelerine veya hizmetlere bağlantılar içerebilir. Üçüncü taraf hizmetlerin içerik, politika veya uygulamalarından sorumlu değiliz.",
            "Harici bağlantıların kullanımı sizin takdirinize bağlıdır ve ilgili üçüncü tarafların koşullarına tabidir.",
          ],
        },
        {
          title: "6. Sorumluluğun Sınırı",
          paragraphs: [
            "Yürürlükteki mevzuatın izin verdiği en geniş ölçüde, OWL Intelligence A.Ş. bu internet sitesinin kullanımından veya kullanılamamasından doğan dolaylı, arızi, sonuçsal ya da iş kesintisine ilişkin zararlardan sorumlu tutulamaz.",
            "Bu koşullar, kanunen hariç tutulması mümkün olmayan sorumlulukları ortadan kaldırmaz.",
          ],
        },
        {
          title: "7. İletişim",
          paragraphs: [
            "Bu koşullarla ilgili sorularınız veya içerik kullanımına ilişkin izin talepleriniz için internet sitesinde belirtilen iletişim kanallarından bize ulaşabilirsiniz.",
          ],
        },
      ],
    },
    cookie: {
      badge: "Çerez Bildirimi",
      title: "Deneyimi açık ve güvenilir tutmak için çerez kullanıyoruz.",
      body:
        "Siteyi çalıştırmak, temel tercihleri hatırlamak ve genel kullanım örüntülerini anlamak için zorunlu çerezler ve sınırlı analiz amaçlı depolama teknolojileri kullanıyoruz. Ayrıntıları Gizlilik Politikası ve Kullanım Koşulları içinde inceleyebilirsiniz.",
      accept: "Çerezleri Kabul Et",
      privacyLabel: "Gizlilik Politikası",
      termsLabel: "Kullanım Koşulları",
    },
  },
};

export function getLegalContent(locale: string): LegalCopy {
  return locale === "tr" ? legalContent.tr : legalContent.en;
}
