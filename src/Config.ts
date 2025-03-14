
class Config {
    private _supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmbGJpZWRhb2toZXJxbGZyaGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NjEyOTQsImV4cCI6MjA1NzQzNzI5NH0.Cb9A35clVcJ5q_0NRmKalF7TlGQRLAM-8jcsbQIrNqI';

    public get supabaseAnonKey() {
        return this._supabaseAnonKey;
    }
}

export const config = new Config();