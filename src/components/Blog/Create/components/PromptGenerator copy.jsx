"use client";
import React from "react";

// Ta liste de services
const SERVICES = [
    "Gestion du stress avant examen",
    "Gestion des situations de conduite difficiles",
    "Conduite accompagnée ou supervisée",
    "Coaching Concentration",
    "Maîtrise de la trajectoire",
    "Peur de la conduite (Amaxophobie)",
    "Perfectionnement de la Conduite",
];

// Génération du prompt amélioré
function makePrompt(textSource) {
    return `
Tu es un rédacteur expert en blogging pédagogique sur la conduite et la gestion du stress au volant.  
Intègre dans ton article, sans les énumérer, les services suivants :
${SERVICES.map((s) => `- ${s}`).join("\n")}

À partir du texte source ci-dessous, génère **uniquement** un objet JSON avec les clés suivantes :
- **title** : titre accrocheur  
- **excerpt** : phrase d’accroche (≤150 caractères)  
- **content** : contenu au format Markdown, structuré en sections. Pour chaque section :
  - un titre de niveau 2 personnalisé (ex : \`## Mes conseils pour surmonter vos craintes\`, pas \`## Introduction rassurante\`)
  - un paragraphe de 2 à 3 phrases développant réellement l’idée  
- **tags** : tableau de mots-clés  
- **seo** :
  - **title** : titre SEO (≤60 caractères)
  - **description** : méta-description (≤155 caractères)

**Sections et ordre** :
1. Introduction rassurante  
2. Causes traumatiques  
3. Causes techniques  
4. Conseils pratiques  
5. Conclusion motivante  

**Contraintes** :
- Le champ **content** doit débuter par la section “Introduction rassurante” transformée en un titre personnalisé.  
- Ne renvoie aucun texte hors du JSON et aucun bloc de code.  
- Optimise pour les mots-clés : « peur de la conduite » et « progresser au volant ».
**Ne renvoie que le JSON**, sans texte explicatif.

**Texte source**  
\`\`\`
${textSource}
\`\`\`
`.trim();
}

export default function PromptGenerator({ textSource, onGenerate, generatedPrompt, onCopyPrompt }) {
    const handleGenerate = () => {
        onGenerate(makePrompt(textSource));
    };
    return (
        <section className="bg-white rounded-xl shadow p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Générateur de prompt ChatGPT</h3>
            <textarea
                className="w-full min-h-32 border rounded px-3 py-2 mb-2"
                placeholder="Collez ici le texte source de ta vidéo…"
                value={textSource}
                readOnly
            />
            <button
                onClick={handleGenerate}
                disabled={!textSource.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
            >
                Générer le prompt
            </button>

            {generatedPrompt && (
                <>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Prompt généré :</span>
                        <button
                            onClick={onCopyPrompt}
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 text-sm"
                        >
                            Copier le prompt
                        </button>
                    </div>
                    <textarea
                        readOnly
                        className="w-full min-h-32 border rounded px-3 py-2 font-mono bg-gray-50"
                        value={generatedPrompt}
                    />
                </>
            )}
        </section>
    );
}
