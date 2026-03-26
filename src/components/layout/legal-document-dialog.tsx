"use client";

import { useLocale } from "next-intl";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { getLegalContent, type LegalDocumentKey } from "./legal-content";

type LegalDocumentDialogProps = {
  documentKey: LegalDocumentKey;
  triggerLabel?: string;
  className?: string;
};

export function LegalDocumentDialog({
  documentKey,
  triggerLabel,
  className,
}: LegalDocumentDialogProps) {
  const locale = useLocale();
  const document = getLegalContent(locale)[documentKey];

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className={cn(
              "text-left text-sm text-muted-foreground transition-colors hover:text-foreground",
              className
            )}
            data-testid={`legal-dialog-trigger-${documentKey}`}
          />
        }
      >
        {triggerLabel ?? document.label}
      </DialogTrigger>
      <DialogContent
        data-testid={`legal-dialog-${documentKey}`}
        showCloseButton={false}
        className="h-[min(calc(100dvh-2rem),56rem)] w-[min(calc(100vw-2rem),92rem)] max-w-none overflow-hidden rounded-[1.35rem] border border-border/80 bg-background p-0 text-foreground shadow-[0_36px_120px_-42px_rgba(3,8,20,0.82)]"
      >
        <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)]">
          <div className="border-b border-border/70 bg-muted/[0.28] px-6 pb-5 pt-6 sm:px-8 lg:px-10">
            <div className="flex items-start justify-between gap-4">
              <DialogHeader className="gap-3 pr-2">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-chart-3/90">
                  {document.eyebrow}
                </p>
                <DialogTitle className="max-w-[34ch] text-[1.35rem] font-semibold tracking-[-0.03em] text-foreground sm:text-[1.6rem] lg:text-[1.75rem]">
                  {document.title}
                </DialogTitle>
                <DialogDescription className="max-w-4xl text-[0.98rem] leading-7 text-muted-foreground">
                  {document.summary}
                </DialogDescription>
              </DialogHeader>
              <DialogClose
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="mt-0.5 shrink-0"
                  />
                }
              >
                <XIcon />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
          </div>

          <div className="min-h-0 overflow-y-auto px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
            <div className="grid gap-5 pr-2 sm:pr-4 lg:gap-6 lg:pr-6">
              {document.sections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-[0.95rem] border border-border/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.018),rgba(255,255,255,0))] px-5 py-5 sm:px-6"
                >
                  <h3 className="text-[1rem] font-semibold tracking-[-0.01em] text-foreground sm:text-[1.05rem]">
                    {section.title}
                  </h3>
                  <div className="mt-4 space-y-3.5">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="max-w-none text-[0.98rem] leading-7 text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets ? (
                      <ul className="space-y-2.5 border-t border-border/60 pt-4 text-[0.96rem] text-muted-foreground">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 leading-7">
                            <span
                              aria-hidden
                              className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-3"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
