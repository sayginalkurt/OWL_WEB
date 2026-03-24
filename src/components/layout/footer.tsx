import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="relative z-[12] border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src="/images/owlgold.svg"
                alt="OWL"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-semibold">OWL Intelligence</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("description")}
            </p>
            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              <p>{t("uk")}</p>
              <p>{t("turkey")}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t("products")}</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/products/fwbm"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {nav("fwbm")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products/fuzzyowl"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {nav("fuzzyowl")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t("company")}</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about/founders"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {nav("founders")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about/investors"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {nav("investors")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {nav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t("legal")}</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="text-sm text-muted-foreground">
                  {t("privacy")}
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  {t("terms")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} OWL Intelligence Ltd.{" "}
            {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
