'use client';

type CookingModeProps = {
  steps: string[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onClose: () => void;
};

export default function CookingMode({
  steps,
  currentStep,
  onStepChange,
  onClose,
}: CookingModeProps) {
  if (!steps.length) return null;

  const goToPrevious = () => {
    onStepChange(Math.max(currentStep - 1, 0));
  };

  const goToNext = () => {
    onStepChange(Math.min(currentStep + 1, steps.length - 1));
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen flex-col bg-[hsl(var(--background))] px-6 py-10">
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-300">Cooking mode</p>
            <h2 className="text-2xl font-bold">
              Step {currentStep + 1} of {steps.length}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-[hsl(var(--foreground)/0.06)]"
          >
            Exit
          </button>
        </div>

        <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-[hsl(var(--foreground)/0.1)]">
          <div
            className="h-full rounded-full bg-black transition-all duration-300 dark:bg-white"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full rounded-3xl border p-8 shadow-sm md:p-12">
            <p className="text-center text-2xl font-semibold leading-relaxed md:text-4xl">
              {steps[currentStep]}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goToPrevious}
            disabled={currentStep === 0}
            className="rounded-xl border px-5 py-3 font-medium transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-[hsl(var(--foreground)/0.06)]"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={goToNext}
            disabled={currentStep === steps.length - 1}
            className="rounded-xl bg-black px-5 py-3 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}