export interface Messaggio{
    id: number;
    testo: string;
    usernameMittente: string;
    letto: boolean;
    inviatoIl: string;
    lettoIl: string | null;
    conversazioneId: number; 
}