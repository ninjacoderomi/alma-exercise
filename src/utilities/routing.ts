import { usePathname } from "next/navigation";

export function stripLocalizationFromPathname(pathname: string): string {
    const parts = pathname.split('/');
    if (parts.length > 1 && /^[a-z]{2}(-[A-Z]{2})?$/.test(parts[1])) {
        parts.splice(1, 1);
    }
    return parts.join('/');
}

export function usePathnameWithOutL18n(): string {
    const pathname = usePathname();
    return stripLocalizationFromPathname(pathname);
}