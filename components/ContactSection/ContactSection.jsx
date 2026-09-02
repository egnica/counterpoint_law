"use client";

import styles from "./ContactSection.module.css";

const CONTACT_EMAIL = "vp@vincentpeppelaw.com";

export default function ContactSection({
  heading = "Start a conversation with Counterpoint.",
  intro = "Tell us a little about the legal or business issue you are working through. Counterpoint can help identify the next practical step.",
}) {
  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const subject = "Counterpoint Law website inquiry";
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Area of need: ${data.get("matter") || ""}`,
      `How they found Counterpoint: ${data.get("referral") || ""}`,
      "",
      "Message:",
      data.get("message") || "",
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Contact Counterpoint</p>
          <h2>{heading}</h2>
          <p>{intro}</p>
          <p className={styles.direct}>
            Prefer email?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>

            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
          </div>

          <div className={styles.row}>
            <label>
              <span>Phone <em>optional</em></span>
              <input name="phone" type="tel" autoComplete="tel" />
            </label>

            <label>
              <span>What can we help with?</span>
              <select name="matter" defaultValue="">
                <option value="" disabled>
                  Select an area
                </option>
                <option>Business & Corporate</option>
                <option>Technology</option>
                <option>Entertainment & Music</option>
                <option>Copyright, Trademark & Brand Protection</option>
                <option>Dispute Resolution</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          <label>
            <span>How did you learn about Counterpoint? <em>optional</em></span>
            <input name="referral" type="text" />
          </label>

          <label>
            <span>Message</span>
            <textarea name="message" rows="5" required />
          </label>

          <div className={styles.formFooter}>
            <p>
              Please do not include confidential or sensitive information. Sending
              a message does not create an attorney-client relationship.
            </p>
            <button type="submit">Contact Counterpoint</button>
          </div>
        </form>
      </div>
    </section>
  );
}
