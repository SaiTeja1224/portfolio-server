import { emailPattern } from "./regExPatterns";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

export const limitText = (maxLength: number, input: string) => {
  if (input.length > maxLength) {
    return input.slice(0, maxLength);
  } else return input;
};

export const contactFormValidator = (formData: {
  emailId: string;
  message: string;
}) => {
  try {
    let isValid = true;
    let errorMessage = "";

    const window = new JSDOM("").window;
    const purify = DOMPurify(window);

    const sanitizedMessage = purify.sanitize(formData.message);
    const limitedText = limitText(800, sanitizedMessage);
    formData.message = limitedText;

    if (!emailPattern.test(formData.emailId.trim())) {
      errorMessage = "Please enter a valid email address";
      isValid = false;
    } else if (formData.message.trim() === "") {
      errorMessage = "Message is required";
      isValid = false;
    }
    return { isValid, errorMessage };
  } catch (error) {
    const errorMessage = (error as any)?.message || "An error occurred";
    return { isValid: false, errorMessage };
  }
};
