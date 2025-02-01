import { Lead } from '@/types/lead';
import { create } from 'zustand'

type LeadWithName = Lead & { name: string };
export interface Store {
    leads: LeadWithName[];
    filter: {
        name: string;
        status: string;
    };
    getLeads: () => Lead[];
    addLead: (lead: Lead) => void;
    removeLead: (lead: Lead) => void;
    setNameFilter: (name: string) => void;
    setStatusFilter: (status: string) => void;
    syncLeads: () => void;
}
const fetchLeads = async (): Promise<Lead[]> => {
    return fetch('/api/leads')
        .then((response) => {
            try {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
            } catch (error) {
                console.error('Error fetching leads:', error)
            }
            return response.json()
        })
}
export const useLeadsStore = create<Store>((set, get) => {
    fetchLeads().then((data) => set({ leads: data.map((lead: Lead) => ({ ...lead, name: lead.firstName + ' ' + lead.lastName })) }))
        .catch((error) => console.error('Error fetching leads:', error));

    return {
        leads: [] as LeadWithName[],
        getLeads: () => {
            const { leads, filter } = get();
            return leads.filter((lead) => {
                const nameMatch = lead.name.toLowerCase().includes(filter.name.toLowerCase());
                const statusMatch = filter.status ? lead.status === filter.status : true;
                return nameMatch && statusMatch;
            });
        },
        filter: {
            name: '',
            status: ''
        },
        setNameFilter: (name: string) => {
            set((state) => ({ filter: { ...state.filter, name } }))
        },
        setStatusFilter: (status: string) => {
            set((state) => ({ filter: { ...state.filter, status } }))
        },
        addLead: (lead: Lead) => set((state) => ({ leads: [...state.leads, { ...lead, name: lead.firstName + ' ' + lead.lastName }] })),
        removeLead: (lead: Lead) =>
            set((state) => ({
                leads: state.leads.filter((item) => item.id !== lead.id),
            })),
        syncLeads: () => {
            fetchLeads().then((data) => set({ leads: data.map((lead: Lead) => ({ ...lead, name: lead.firstName + ' ' + lead.lastName })) }))
                .catch((error) => console.error('Error fetching leads:', error));
        }

    }
})


