import { countries } from "./countries-list";

export const schema = {
    type: "object",
    properties: {
        firstName: { type: "string", title: "First Name" },
        lastName: { type: "string", title: "Last Name" },
        email: { type: "string", format: "email", title: "Email" },
        country: {
            type: "string",
            title: "Country of Citizenship",
            enum: countries,
        },
        url: { type: "string", title: "LinkedIn/Website Link" },
        resume: { type: "string", title: "Resume" },
        visaCategories: {
            type: "array",
            title: "",
            uniqueItems: true,
            items: {
                type: "string",
                enum: [
                    "O-1",
                    "EB-1",
                    "EB-2",
                    "EB-3",
                    "EB-4",
                    "EB-5",
                    "H-1B",
                    "I don't know",
                ],
            },
        },
        details: {
            type: "string",
            placeholder: `what is your current status and when does it expire!
What is your past immigration history? Are you
or short-term employment visa or both? Are there dily ultreme considerators`,
            maxLength: 500,
            format: "textarea",
        },
    },
    required: ["firstName", "lastName", "email", "country", "url", "resume"],
};

export const uischema = {
    type: "VerticalLayout",
    elements: [
        {
            type: "Group",
            label: "",
            elements: [
                { type: "Control", scope: "#/properties/firstName" },
                { type: "Control", scope: "#/properties/lastName" },
                { type: "Control", scope: "#/properties/email" },
                {
                    type: "Control",
                    scope: "#/properties/country",
                    options: { autocomplete: true },
                },
                { type: "Control", scope: "#/properties/url" },
                { type: "Control", scope: "#/properties/resume" },
            ],
        },
        {
            type: "Group",
            label: "Visa categories of Interest",
            elements: [
                {
                    type: "Control",
                    scope: "#/properties/visaCategories",
                    options: {
                        multi: true,
                    },
                },
            ],
        },
        {
            type: "Group",
            label: "How can we help you?",
            elements: [
                {
                    type: "Control",
                    scope: "#/properties/details",
                    options: { multi: true, format: "textarea" },
                },
            ],
        },
    ],
};
