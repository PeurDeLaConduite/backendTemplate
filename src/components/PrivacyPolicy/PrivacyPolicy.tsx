import React from "react";
import "./PrivacyPolicy.css";
import Link from "next/link";

const PrivacyPolicy = () => (
    <div className="pp_politique-container">
        <h2 className="pp_title" id="privacy-policy">
            Politique de Confidentialité
        </h2>

        {/* 1. Transmission à des tiers */}
        <section className="pp">
            <h3 className="pp_section-title">
                🔒 Aucune transmission à des tiers
            </h3>
            <p>
                Les informations que vous renseignez (nom, prénom, email,
                téléphone, etc.){" "}
                <strong>ne seront jamais partagées avec des tiers</strong>
                .<br />
                Elles sont <strong>uniquement</strong> destinées à vous
                contacter si vous en avez fait la demande.
            </p>
        </section>

        {/* 2. Sécurité */}
        <section className="pp">
            <h3 className="pp_section-title">🔐 Sécurité maximale</h3>
            <p>
                Vos données sont stockées de manière <strong>sécurisée</strong>,
                avec des mesures techniques et organisationnelles visant à{" "}
                <strong>empêcher tout accès non autorisé</strong>.
            </p>
        </section>

        {/* 3. Consentement */}
        <section className="pp">
            <h3 className="pp_section-title">✅ Consentement clair</h3>
            <ul className="pp_list">
                <li>
                    En cochant la case :{" "}
                    <em>
                        <strong>
                            &quot;J&apos;ai lu et accepté les conditions
                            d&apos;utilisation&quot;
                        </strong>
                    </em>
                    .<br />
                    Vous donnez votre <strong>consentement clair</strong> à
                    notre politique de confidentialité.
                </li>
                <li>
                    L’inscription aux notifications d’événements est{" "}
                    <strong>entièrement facultative</strong>.<br /> Vous
                    recevrez des informations{" "}
                    <strong>
                        uniquement si vous avez donné votre accord explicite
                    </strong>
                    .
                </li>
            </ul>
            <p></p>
        </section>

        {/* 4. Vos droits */}
        <section className="pp">
            <h3 className="pp_section-title">📬 Vos droits</h3>
            <span>À tout moment, vous pouvez :</span>
            <ul className="pp_list">
                <li>
                    Demander la <strong>modification</strong> ou{" "}
                    <strong>la suppression</strong> de vos données personnelles.
                </li>
                <li>
                    Exercer vos droits en nous contactant via le{" "}
                    <a href="/contact">formulaire dédié</a>.
                </li>
            </ul>
            <p></p>
        </section>
        <section className="pp">
            <h3 className="pp_section-title">📘 Base légale</h3>
            <p>
                <em>
                    Conformément à :{" "}
                    <strong>
                        <Link href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre2">
                            L’article 6 du Règlement Général de la Protection
                            des Données (RGPD)
                        </Link>
                    </strong>
                    , le traitement de vos données repose uniquement sur votre
                    consentement explicite,
                </em>
            </p>
        </section>
    </div>
);

export default PrivacyPolicy;
