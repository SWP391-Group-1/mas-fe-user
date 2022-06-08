import jwt_decode from 'jwt-decode'

export function checkAuth() {
    const token = localStorage.getItem('access-token')

    if (!token)
        return null;

    try {
        const payload = jwt_decode(token);
        if (!payload?.Id)
            return null;

        return {
            id: payload.Id,
            role: payload[
                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ],
        }
    }
    catch {
        return null;
    }
}
