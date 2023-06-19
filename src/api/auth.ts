export const login = async (username: string, password: string): Promise<{ status: number, data: { name: string, email: string } }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username && password) {
                resolve({
                    status: 200,
                    data: {
                        name: username,
                        email: password
                    }
                });
            } else {
                resolve({
                    status: 400,
                    data: {
                        name: "",
                        email: ""
                    }
                });
            }
        }, 1000);
    });
};
