export default interface ServiceAccountJson {
    client_email: string
    private_key: string
    project_id: string
    auth_provider_x509_cert_url?: string
    auth_uri?: string
    client_id?: string
    client_x509_cert_url?: string
    private_key_id?: string
    token_uri?: string
    type?: string
};    
