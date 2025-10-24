export const permissionRole = ["partner", 'user','corporate', 'admin']

export  const roleRedirectMap: Record<string, string> = {
    corporate: '/corporate_login',
    partner: '/partner_login',
    admin: '/admin',
  };