import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

const leads = [
    { id: 1, name: 'Lead One', email: 'leadone@example.com', submitted: new Date(), status: 'pending', country: 'Canada' },
    { id: 2, name: 'Lead Two', email: 'leadtwo@example.com', submitted: new Date(), status: 'reached_out', country: 'UK' },
    { id: 3, name: 'Lead Three', email: 'leadthree@example.com', submitted: new Date(), status: 'pending', country: 'Australia' },
    { id: 4, name: 'Lead Four', email: 'leadfour@example.com', submitted: new Date(), status: 'reached_out', country: 'India' },
    { id: 5, name: 'Lead Five', email: 'leadfive@example.com', submitted: new Date(), status: 'pending', country: 'Germany' },
    { id: 6, name: 'Lead Six', email: 'leadsix@example.com', submitted: new Date(), status: 'reached_out', country: 'France' },
    { id: 7, name: 'Lead Seven', email: 'leadseven@example.com', submitted: new Date(), status: 'pending', country: 'Brazil' },
    { id: 8, name: 'Lead Eight', email: 'leadeight@example.com', submitted: new Date(), status: 'reached_out', country: 'Japan' },
    { id: 9, name: 'Lead Nine', email: 'leadnine@example.com', submitted: new Date(), status: 'pending', country: 'Italy' },
    { id: 10, name: 'Lead Ten', email: 'leadten@example.com', submitted: new Date(), status: 'reached_out', country: 'Spain' },
    { id: 11, name: 'Lead Eleven', email: 'leadeleven@example.com', submitted: new Date(), status: 'pending', country: 'Netherlands' },
    { id: 12, name: 'Lead Twelve', email: 'leadtwelve@example.com', submitted: new Date(), status: 'reached_out', country: 'Sweden' }
];

async function authenticate(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req, res);
    if (!session?.user?.email) {
        res.status(401).json({ error: 'Not logged in' });
        return null;
    }
    return session;
}

export const GET = withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await authenticate(req, res);
    if (!session) return;
    res.json(leads);
});

export const PUT = withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await authenticate(req, res);
    if (!session) return;
    const newLead = req.body;
    leads.push(newLead);
    res.status(201).json(newLead);
});

export const POST = withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await authenticate(req, res);
    if (!session) return;
    const { id, status } = req.body;
    const validStatuses = ['pending', 'reached_out', 'contacted', 'closed'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    const lead = leads.find(lead => lead.id === id);
    if (lead) {
        lead.status = status;
        res.json(lead);
    } else {
        res.status(404).json({ message: 'Lead not found' });
    }
});

