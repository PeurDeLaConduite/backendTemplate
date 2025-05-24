// src/components/Blog/Create/components/PromptGenerator.jsx
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

// Génération du prompt
function makePrompt(textSource) {
    return `
Tu es un rédacteur expert en blogging pédagogique sur la conduite et la gestion du stress au volant.  
Voici la liste des services que tu proposes à intégrer dans la réflexion :
${SERVICES.map((s, i) => `- ${s}`).join("\n")}
À partir du texte source ci-dessous, crée un article de blog structuré et renvoie **uniquement** un objet JSON avec ces clés :

  À partir du texte source ci-dessous, crée un article de blog structuré et renvoie **uniquement** un objet JSON avec ces clés :
  
  - **title** : titre accrocheur  
  - **excerpt** : une phrase introductive (max. 150 caractères)  
  - **content** : le corps HTML ou Markdown de l’article, organisé en sections  
  - **tags** : liste de mots-clés séparés par des virgules  
  - **seo** :  
    - **title** : titre SEO (max. 60 caractères)  
    - **description** : méta-description (max. 155 caractères)
  
  **Contraintes**  
  1. Structure l’article avec un <h2> pour chaque partie.  
  2. Inclue ces sections :  
     - Introduction rassurante  
     - Causes traumatiques  
     - Causes techniques  
     - Conseils pratiques  
     - Conclusion motivante  
  3. Intègre si possible les services suivants (sans les lister dans la sortie) :  
     Gestion du stress avant examen, Situations de conduite difficiles, Conduite supervisée, Coaching Concentration, Maîtrise de la trajectoire, Amaxophobie, Perfectionnement.  
  4. Optimise pour les mots-clés : « peur de la conduite », « progresser au volant ».  
  5. **Ne renvoie que le JSON**, sans texte explicatif.
  
  **Texte source**  
"""
${textSource}
"""
`.trim();
}

export default function PromptGenerator({
    textSource,
    onGenerate,
    generatedPrompt,
    onCopyPrompt, // <-- nouveau
}) {
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
