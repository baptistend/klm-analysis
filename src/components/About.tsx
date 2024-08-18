import React from "react";

export const About: React.FC = () => {
    return (
        <div className="p-p-4">
            <div className="flex flex-column align-items-center">
                <h1 className="text-2xl text-primary-800 mb-4">Modèle Key-Level (KLM)</h1>
                <p className="text-lg text-secondary-700 text-center mb-4">
                    Le Modèle Key-Level (KLM) est une méthode utilisée en interaction homme-machine pour évaluer l'efficacité des interfaces utilisateur. Il aide à prédire le temps nécessaire à un utilisateur pour accomplir une tâche en décomposant la tâche en une série d'opérateurs de base. Chaque opérateur représente une action fondamentale ou un processus cognitif nécessaire pour compléter la tâche.
                </p>
                <h2 className="text-xl text-primary-700 mb-4">Opérateurs KLM</h2>
                <ul className="list-disc pl-5 text-secondary-700">
                    <li className="mb-2">
                        <strong>K (Appui sur une touche ou un bouton)</strong> : Cet opérateur représente l'action d'appuyer sur une touche ou un bouton. Il a une valeur typique de <strong>0,28 secondes</strong>.
                    </li>
                    <li className="mb-2">
                        <strong>P (Pointage)</strong> : Cet opérateur représente l'action de pointer vers une cible avec une souris. Il a une valeur typique de <strong>1,1 seconde</strong>.
                    </li>
                    <li className="mb-2">
                        <strong>H (Déplacement des mains)</strong> : Cet opérateur représente le temps nécessaire pour déplacer les mains du clavier à la souris ou inversement. Il a une valeur typique de <strong>0,4 secondes</strong>.
                    </li>
                    <li className="mb-2">
                        <strong>M (Préparation mentale)</strong> : Cet opérateur représente la préparation mentale requise avant de réaliser une action. Il a une valeur typique de <strong>1,35 secondes</strong>.
                    </li>
                    <li className="mb-2">
                        <strong>R (Temps de réponse du système)</strong> : Cet opérateur représente le temps variable que le système met pour répondre à une action. Sa valeur est <strong>à spécifier</strong> car elle est considérée comme variable et dépendante du contexte.
                    </li>
                    <li className="mb-2">
                        <strong>D (Traçage de n lignes de longueur l )</strong> : Cet opérateur représente le temps nécessaire pour les actions de glissement, basé sur les temps de glissement typiques. Il a des valeurs de <strong> 0.9n + 0.16 secondes.</strong>
                    </li>
                </ul>
                <p className="text-lg text-secondary-700 text-center mt-4">
                    En analysant une tâche avec ces opérateurs, les concepteurs et les chercheurs peuvent estimer le temps nécessaire aux utilisateurs pour accomplir des interactions spécifiques et améliorer l'utilisabilité de l'interface.
                </p>
            </div>
        </div>
    );
};
