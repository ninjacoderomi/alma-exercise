import { stripLocalizationFromPathname } from "./routing";

describe("stripLocalizationFromPathname", () => {
    it("should remove localization from pathname", () => {
        expect(stripLocalizationFromPathname("/en/home")).toBe("/home");
        expect(stripLocalizationFromPathname("/en-US/home")).toBe("/home");
        expect(stripLocalizationFromPathname("/fr/about")).toBe("/about");
        expect(stripLocalizationFromPathname("/es-ES/contact")).toBe("/contact");
    });

    it("should not modify pathname without localization", () => {
        expect(stripLocalizationFromPathname("/home")).toBe("/home");
        expect(stripLocalizationFromPathname("/about")).toBe("/about");
        expect(stripLocalizationFromPathname("/contact")).toBe("/contact");
    });

    it("should handle root path correctly", () => {
        expect(stripLocalizationFromPathname("/")).toBe("/");
    });

    it("should handle paths with multiple segments correctly", () => {
        expect(stripLocalizationFromPathname("/en-US/home/settings")).toBe("/home/settings");
        expect(stripLocalizationFromPathname("/fr/about/team")).toBe("/about/team");
    });
});
