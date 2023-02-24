import { ROLE_ADMIN } from '~/constants';

const authorize = async () => {
    return ROLE_ADMIN;
};

export { authorize };
