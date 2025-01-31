import { GET, PUT, POST } from './route';
import { getSession } from '@auth0/nextjs-auth0';

jest.mock('@auth0/nextjs-auth0', () => ({
    getSession: jest.fn(),
    withApiAuthRequired: (handler: any) => handler,
}));

const mockLeads = [
    { id: 1, name: 'Lead One', email: 'leadone@example.com', submitted: new Date(), status: 'pending', country: 'Canada' },
    // ...other mock leads...
];

describe('API Handlers', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        req = { method: '', body: {}, headers: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        (getSession as jest.Mock).mockResolvedValue({ user: { email: 'test@example.com' } });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET', () => {
        it('should return leads if authenticated', async () => {
            req.method = 'GET';
            await GET(req, res);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockLeads);
        });

        it('should return 401 if not authenticated', async () => {
            (getSession as jest.Mock).mockResolvedValue(null);
            req.method = 'GET';
            await GET(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Not logged in' });
        });
    });

    describe('PUT', () => {
        it('should add a new lead if authenticated', async () => {
            req.method = 'PUT';
            req.body = { id: 13, name: 'Lead Thirteen', email: 'leadthirteen@example.com', submitted: new Date(), status: 'pending', country: 'USA' };
            await PUT(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(req.body);
        });

        it('should return 401 if not authenticated', async () => {
            (getSession as jest.Mock).mockResolvedValue(null);
            req.method = 'PUT';
            await PUT(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Not logged in' });
        });
    });

    describe('POST', () => {
        it('should update lead status if authenticated and valid status', async () => {
            req.method = 'POST';
            req.body = { id: 1, status: 'contacted' };
            await POST(req, res);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1, status: 'contacted' }));
        });

        it('should return 400 if invalid status', async () => {
            req.method = 'POST';
            req.body = { id: 1, status: 'invalid_status' };
            await POST(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid status' });
        });

        it('should return 404 if lead not found', async () => {
            req.method = 'POST';
            req.body = { id: 999, status: 'contacted' };
            await POST(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Lead not found' });
        });

        it('should return 401 if not authenticated', async () => {
            (getSession as jest.Mock).mockResolvedValue(null);
            req.method = 'POST';
            await POST(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Not logged in' });
        });
    });
});
