import { localizedString } from "./objects/localizedString";
import { localizedBlock } from "./objects/localizedBlock";
import { seo } from "./objects/seo";
import { product } from "./documents/product";
import { solution } from "./documents/solution";
import { insight } from "./documents/insight";
import { founder } from "./documents/founder";
import { partner } from "./documents/partner";
import { faq } from "./documents/faq";
import { page } from "./documents/page";

export const schemaTypes = [
  // Objects
  localizedString,
  localizedBlock,
  seo,
  // Documents
  product,
  solution,
  insight,
  founder,
  partner,
  faq,
  page,
];
