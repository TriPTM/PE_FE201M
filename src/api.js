const BASE_URL = 'https://67d97a9900348dd3e2ab439a.mockapi.io/api/Staff';

export const fetchStaffs = () => {
    return fetch(BASE_URL).then(res => res.json());
};

export const fetchStaffById = (id) => {
    return fetch(`${BASE_URL}/${id}`).then(res => res.json());
};

export const addStaff = (staff) => {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staff),
    }).then(res => res.json());
};

export const updateStaff = (id, staff) => {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staff),
    }).then(res => res.json());
};

export const deleteStaff = (id) => {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    }).then(res => res.json());
};