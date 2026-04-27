import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FoodLabel, PRODUCT_LABELS } from "@/components/food-label";
import { XUBIE_DATA } from "@/lib/data";
import { ShieldCheck, FileText, ClipboardList, AlertTriangle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Licensing & Compliance | Xubie Snacks",
  description:
    "Xubie Snacks regulatory compliance information. Cottage Food Operation (CFO) permit details, food handler certification, product labels, and Santa Clara County health compliance.",
};

const PERMIT_SECTIONS = [
  {
    icon: ShieldCheck,
    title: "Cottage Food Operation (CFO) Permit",
    items: [
      "Permit Type: Class A CFO — direct sales only within California",
      "Issuing Authority: Santa Clara County Department of Environmental Health, Consumer Protection Division",
      "Address: 1555 Berger Drive, Suite 300, San Jose, CA 95112",
      "Phone: (408) 918-3400 | Website: www.ehinfo.org",
      "CFO Business Name: Xubie Snacks",
      "CFO Owner: Nina Lux",
      "CFO Location: San Jose, CA 95128",
      "Permit Number: [Pending — Application submitted to Santa Clara County DEH]",
      "All sales are direct-to-consumer within California",
    ],
  },
  {
    icon: FileText,
    title: "Food Handler Certification",
    items: [
      "Food Handler Card held by: Nina Lux",
      "Certifying Agency: Santa Clara County Department of Environmental Health",
      "Food handler certification is maintained and renewed as required by California law",
      "All food preparation complies with the CFO Self-Certification Checklist requirements",
    ],
  },
  {
    icon: ClipboardList,
    title: "Labeling Compliance",
    items: [
      "All product labels comply with the Federal Food, Drug, and Cosmetic Act (21 U.S.C. Sec. 343 et seq.)",
      "Each label includes: product name (front panel), 'Made in a Home Kitchen' statement (front panel), permit number, county of issuance (Santa Clara), business name and address, full ingredient list in descending order by weight, net weight in English and metric units, and major food allergens",
      "Separate ingredient disclosures are provided for fillings, toppings, and crusts where applicable",
      "Labels are written in English per California Department of Public Health requirements",
      "All advertisements (website, social media) include: county of approval, permit number, and 'Made in a Home Kitchen' statement",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Facility & Sanitation Requirements",
    items: [
      "All food is prepared in the private home kitchen where the CFO owner resides",
      "Gross annual sales remain within the Class A CFO legal limits",
      "All food contact surfaces are washed, rinsed, and sanitized before each use using 100ppm chlorine or 200ppm quaternary ammonia solution",
      "Potable (drinking) water is used for all hand washing, ware washing, and as an ingredient",
      "Food preparation areas are maintained free of rodents and insects",
      "No domestic activities occur in the kitchen during food production",
      "Infants, children under 12, and pets are excluded from the kitchen during operation",
      "No smoking is permitted in the food preparation area",
      "All food ingredients are sourced from approved commercial suppliers",
    ],
  },
];

const APPROVED_PRODUCTS_NOTE = `
All products offered by Xubie Snacks are non-perishable cottage foods approved under the 
California Retail Food Code and California Department of Public Health guidelines for 
Cottage Food Operations. Products requiring refrigeration or that are otherwise classified 
as potentially hazardous foods are not sold. For the current list of approved cottage foods, 
visit www.cdph.ca.gov.
`;

export default function LicensingPage() {
  const business = XUBIE_DATA.company;

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-24">
        {/* Header */}
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
              Regulatory Information
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl mt-4 text-[var(--foreground)]">
              Licensing &{" "}
              <span className="text-[var(--primary)]">Compliance</span>
            </h1>
            <p className="text-[var(--muted-foreground)] mt-4 leading-relaxed text-lg">
              Xubie Snacks operates as a California Cottage Food Operation (CFO)
              under permit from Santa Clara County Department of Environmental
              Health. This page provides complete regulatory disclosure for
              customers, inspectors, and partnering retailers.
            </p>
            <div className="mt-6 p-4 border border-[var(--primary)]/30 bg-[var(--primary)]/5 rounded-xl flex items-start gap-3">
              <ShieldCheck size={20} className="text-[var(--primary)] mt-0.5 shrink-0" />
              <p className="text-sm text-[var(--foreground)] leading-relaxed">
                <strong>Business Owner:</strong> Nina Lux &nbsp;|&nbsp;{" "}
                <strong>Business:</strong> {business.name} &nbsp;|&nbsp;{" "}
                <strong>Location:</strong> San Jose, CA 95128 &nbsp;|&nbsp;{" "}
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${business.email}`}
                  className="text-[var(--primary)] underline underline-offset-2"
                >
                  {business.email}
                </a>
              </p>
            </div>
          </div>

          {/* Permit & compliance sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {PERMIT_SECTIONS.map((section) => (
              <div
                key={section.title}
                className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                    <section.icon size={20} className="text-[var(--primary)]" />
                  </div>
                  <h2 className="font-serif text-lg text-[var(--foreground)]">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-[var(--muted-foreground)] leading-relaxed flex items-start gap-2"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)]/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Approved products note */}
          <div className="mb-16 p-6 bg-[var(--secondary)] border border-[var(--border)] rounded-2xl">
            <h2 className="font-serif text-xl text-[var(--foreground)] mb-3">
              Approved Cottage Food Products
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              {APPROVED_PRODUCTS_NOTE.trim()}
            </p>
            <p className="text-sm text-[var(--muted-foreground)] mt-3 leading-relaxed">
              For questions or to request documentation, contact:{" "}
              <a
                href={`mailto:${business.email}`}
                className="text-[var(--primary)] underline underline-offset-2"
              >
                {business.email}
              </a>{" "}
              or call{" "}
              <a
                href={`tel:${business.phone.replace(/\D/g, "")}`}
                className="text-[var(--primary)] underline underline-offset-2"
              >
                {business.phone}
              </a>
              .
            </p>
          </div>

          {/* Food labels — one per product */}
          <div className="mb-12">
            <span className="text-xs tracking-widest text-[var(--primary)] uppercase">
              Product Labels
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl mt-4 mb-4 text-[var(--foreground)]">
              Cottage Food Labels
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl leading-relaxed mb-10">
              The following labels are submitted as part of the Santa Clara
              County CFO permit application. Each label meets the requirements
              of the Santa Clara County Department of Environmental Health
              Cottage Food Product Labeling Information document, including the
              front-panel disclosures, ingredient lists, net weights, and
              allergen statements. Permit numbers will be updated upon permit
              issuance.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCT_LABELS.map((label) => (
                <div key={label.productId} className="flex flex-col gap-2">
                  <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider font-medium">
                    Product #{label.productId}
                  </p>
                  <FoodLabel label={label} compact={false} />
                </div>
              ))}
            </div>
          </div>

          {/* Regulator contact block */}
          <div className="mt-16 p-8 bg-[var(--foreground)] text-[var(--background)] rounded-2xl">
            <h2 className="font-serif text-2xl mb-4">
              Regulatory Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--background)]/60 mb-2">
                  Issuing Authority
                </p>
                <p className="text-sm leading-relaxed text-[var(--background)]/80">
                  Santa Clara County Department of Environmental Health
                  <br />
                  Consumer Protection Division
                  <br />
                  1555 Berger Drive, Suite 300
                  <br />
                  San Jose, CA 95112
                  <br />
                  Phone: (408) 918-3400
                  <br />
                  Fax: (408) 258-5891
                  <br />
                  Website:{" "}
                  <a
                    href="https://www.ehinfo.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 text-[var(--primary)]"
                  >
                    www.ehinfo.org
                  </a>
                  <br />
                  Email:{" "}
                  <a
                    href="mailto:dehweb@deh.sccgov.org"
                    className="underline underline-offset-2 text-[var(--primary)]"
                  >
                    dehweb@deh.sccgov.org
                  </a>
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--background)]/60 mb-2">
                  CFO Operator
                </p>
                <p className="text-sm leading-relaxed text-[var(--background)]/80">
                  Nina Lux — Xubie Snacks
                  <br />
                  San Jose, CA 95128
                  <br />
                  Phone:{" "}
                  <a
                    href={`tel:${business.phone.replace(/\D/g, "")}`}
                    className="underline underline-offset-2 text-[var(--primary)]"
                  >
                    {business.phone}
                  </a>
                  <br />
                  Email:{" "}
                  <a
                    href={`mailto:${business.email}`}
                    className="underline underline-offset-2 text-[var(--primary)]"
                  >
                    {business.email}
                  </a>
                  <br />
                  Instagram:{" "}
                  <a
                    href="https://www.instagram.com/xubie_snacks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 text-[var(--primary)]"
                  >
                    @xubie_snacks
                  </a>
                </p>
                <p className="text-xs text-[var(--background)]/50 mt-4">
                  Page last updated: {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
