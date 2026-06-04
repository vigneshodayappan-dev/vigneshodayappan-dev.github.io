/* =========================================
   TYPEWRITER COMPONENT ENGINE
========================================= */

const initCorporateTypewriter = () => {
    const textTarget = document.getElementById("typing");
    if (!textTarget) return;

    const dynamicRolesList = [
        "Senior Web Developer.",
        "BS Data Science Student.",
        "Flask System Engineer.",
        "Problem Solver.",
        "Web Designer."
    ];

    let overallRowIndex = 0;
    let singleCharacterIndex = 0;
    let sequenceIsDeleting = false;

    const characterTypingSpeed = 80;
    const characterDeletionSpeed = 30;
    const structuralHoldLimit = 2000;

    // Inject matching clean terminal prompt block rule
    const embeddedStyles = document.createElement("style");
    embeddedStyles.textContent = `
        #typing::after {
            content: "_";
            margin-left: 2px;
            color: var(--accent);
            animation: corporateCursorPulse 0.9s step-end infinite;
        }
        @keyframes corporateCursorPulse {
            from, to { color: transparent }
            50% { color: var(--accent); }
        }
    `;
    document.head.appendChild(embeddedStyles);

    function triggerEvaluationLoop() {
        const operationalString = dynamicRolesList[overallRowIndex];
        let calculatedNextTickDelay = characterTypingSpeed;

        if (!sequenceIsDeleting) {
            textTarget.textContent = operationalString.substring(0, singleCharacterIndex + 1);
            singleCharacterIndex++;

            if (singleCharacterIndex === operationalString.length) {
                sequenceIsDeleting = true;
                calculatedNextTickDelay = structuralHoldLimit;
            }
        } else {
            textTarget.textContent = operationalString.substring(0, singleCharacterIndex - 1);
            singleCharacterIndex--;

            calculatedNextTickDelay = characterDeletionSpeed;

            if (singleCharacterIndex === 0) {
                sequenceIsDeleting = false;
                overallRowIndex = (overallRowIndex + 1) % dynamicRolesList.length;
            }
        }

        setTimeout(triggerEvaluationLoop, calculatedNextTickDelay);
    }

    triggerEvaluationLoop();
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCorporateTypewriter);
} else {
    initCorporateTypewriter();
}