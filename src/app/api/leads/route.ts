import { NextApiRequest } from 'next';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { Lead, VisaCategory } from '../../../types/lead';

const leads: Lead[] = [
    { id: 1, firstName: 'Lead One', lastName: 'One', url: 'http://example.com/1', visaCategories: [VisaCategory.O1], email: 'leadone@example.com', submitted: new Date(), status: 'pending', resume: 'resume1.pdf', country: 'Canada' },
    { id: 2, firstName: 'Lead Two', lastName: 'Two', url: 'http://example.com/2', visaCategories: [VisaCategory.EB1A], email: 'leadtwo@example.com', submitted: new Date(), status: 'reached_out', resume: 'resume2.pdf', country: 'UK' },
    { id: 3, firstName: 'Lead Three', lastName: 'Three', url: 'http://example.com/3', visaCategories: [VisaCategory.EB2NIW], email: 'leadthree@example.com', submitted: new Date(), status: 'pending', resume: 'resume3.pdf', country: 'Australia' },
    { id: 4, firstName: 'Lead Four', lastName: 'Four', url: 'http://example.com/4', visaCategories: [VisaCategory.DONT_KNOW], email: 'leadfour@example.com', submitted: new Date(), status: 'reached_out', resume: 'resume4.pdf', country: 'India' },
    { id: 5, firstName: 'Lead Five', lastName: 'Five', url: 'http://example.com/5', visaCategories: [VisaCategory.O1], email: 'leadfive@example.com', submitted: new Date(), status: 'pending', resume: 'resume5.pdf', country: 'Germany' },
    { id: 6, firstName: 'Lead Six', lastName: 'Six', url: 'http://example.com/6', visaCategories: [VisaCategory.EB1A], email: 'leadsix@example.com', submitted: new Date(), status: 'reached_out', resume: 'resume6.pdf', country: 'France' },
    { id: 7, firstName: 'Lead Seven', lastName: 'Seven', url: 'http://example.com/7', visaCategories: [VisaCategory.EB2NIW], email: 'leadseven@example.com', submitted: new Date(), status: 'pending', resume: 'resume7.pdf', country: 'Brazil' },
    { id: 8, firstName: 'Lead Eight', lastName: 'Eight', url: 'http://example.com/8', visaCategories: [VisaCategory.DONT_KNOW], email: 'leadeight@example.com', submitted: new Date(), status: 'reached_out', resume: 'resume8.pdf', country: 'Japan' },
    { id: 9, firstName: 'Lead Nine', lastName: 'Nine', url: 'http://example.com/9', visaCategories: [VisaCategory.O1], email: 'leadnine@example.com', submitted: new Date(), status: 'pending', resume: 'resume9.pdf', country: 'Italy' },
    { id: 10, firstName: 'Lead Ten', lastName: 'Ten', url: 'http://example.com/10', visaCategories: [VisaCategory.EB1A], email: 'leadten@example.com', submitted: new Date(), status: 'reached_out', resume: 'resume10.pdf', country: 'Spain' },
    { id: 11, firstName: 'Lead Eleven', lastName: 'Eleven', url: 'http://example.com/11', visaCategories: [VisaCategory.EB2NIW], email: 'leadeleven@example.com', submitted: new Date(), status: 'pending', resume: 'resume11.pdf', country: 'Netherlands' },
    { id: 12, firstName: 'Lead Twelve', lastName: 'Twelve', url: 'http://example.com/12', visaCategories: [VisaCategory.DONT_KNOW], email: 'leadtwelve@example.com', submitted: new Date(), status: 'reached_out', resume: 'resume12.pdf', country: 'Sweden' }
];

async function authenticate(req: NextApiRequest, res: NextResponse) {
    const session = await getSession(req, res);
    if (!session?.user?.email) {
        NextResponse.json({ error: 'Not logged in' }, { status: 401 });
        return null;
    }
    return session;
}

export const GET = withApiAuthRequired(async (req: NextApiRequest, res: NextResponse) => {
    const session = await authenticate(req, res);
    if (!session) return;
    return NextResponse.json(leads, res);
});

export const PUT = withApiAuthRequired(async (req: NextRequest, res: NextResponse) => {
    const session = await authenticate(req, res);
    if (!session) return;
    const newLead = await req.json();
    console.log('newLead', newLead);
    if (!newLead) {
        return NextResponse.json({ message: 'Invalid lead data' }, { status: 400 });
    }
    if (!newLead.firstName || !newLead.visaCategories || !newLead.email || !newLead.url || !newLead.resume || !newLead.country) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    newLead.id = leads.length ? leads[leads.length - 1].id + 1 : 1;
    newLead.submitted = new Date();
    leads.push({ ...newLead, status: 'pending', submitted: new Date() });
    return NextResponse.json(newLead);
});

export const POST = withApiAuthRequired(async (req: NextRequest, res: NextResponse) => {
    const session = await authenticate(req, res);
    if (!session) return;
    const { id, status } = await req.json();
    const validStatuses = ['pending', 'reached_out'];

    if (!validStatuses.includes(status)) {
        return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }
    console.log('id', id);
    const lead = leads.find(lead => lead.id === id);
    if (lead) {
        lead.status = status;
        return NextResponse.json(lead);
    } else {
        return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
    }
});

