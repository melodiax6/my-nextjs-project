import { QueryClient } from '@tanstack/react-query';

// Tworzymy nowy obiekt QueryClient
const queryClient = new QueryClient();

// Eksportujemy klienta, aby można było go używać w całej aplikacji
export default queryClient;
