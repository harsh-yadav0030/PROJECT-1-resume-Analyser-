// Configuration for detecting Personally Identifiable Information (PII).

export const PII_PATTERNS = {
  EMAIL: {
    type: "EMAIL",
    anonymize: true,
    category: "PRIVATE",
    placeholder: "EMAIL",
    regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
  },

  PHONE: {
    type: "PHONE",
    anonymize: true,
    category: "PRIVATE",
    placeholder: "PHONE",
    regex:
      /(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{3,5}\)?[\s-]?)?\d{3,5}[\s-]?\d{4,6}\b/g,
  },

  LINKEDIN: {
    type: "LINKEDIN",
    anonymize: true,
    category: "PUBLIC",
    placeholder: "LINKEDIN",
    regex: /https?:\/\/(?:www\.)?linkedin\.com\/[^\s]+/gi,
  },

  GITHUB: {
    type: "GITHUB",
    anonymize: false,
    category: "PUBLIC",
    placeholder: "GITHUB",
    regex: /https?:\/\/(?:www\.)?github\.com\/[^\s]+/gi,
  },

  LEETCODE: {
    type: "LEETCODE",
    anonymize: false,
    category: "PUBLIC",
    placeholder: "LEETCODE",
    regex: /https?:\/\/(?:www\.)?leetcode\.com\/[^\s]+/gi,
  },

  CODEFORCES: {
    type: "CODEFORCES",
    anonymize: false,
    category: "PUBLIC",
    placeholder: "CODEFORCES",
    regex: /https?:\/\/(?:www\.)?codeforces\.com\/profile\/[^\s]+/gi,
  },

  CODECHEF: {
    type: "CODECHEF",
    anonymize: false,
    category: "PUBLIC",
    placeholder: "CODECHEF",
    regex: /https?:\/\/(?:www\.)?codechef\.com\/users\/[^\s]+/gi,
  },

  HACKERRANK: {
    type: "HACKERRANK",
    anonymize: false,
    category: "PUBLIC",
    placeholder: "HACKERRANK",
    regex: /https?:\/\/(?:www\.)?hackerrank\.com\/[^\s]+/gi,
  },

  PORTFOLIO: {
    type: "PORTFOLIO",
    anonymize: false,
    category: "PUBLIC",
    placeholder: "PORTFOLIO",
    regex:
      /https?:\/\/(?!.*(?:linkedin|github|leetcode|codeforces|codechef|hackerrank))[^\s]+/gi,
  },
};