/**
 * Modelo que representa o contrato da API do backend.
 * Espelha exatamente o ApiResponse<T> do Java/Spring Boot.
 *
 * Backend: com.ecommerce.common.dto.ApiResponse
 * Campos: success (boolean), message (String), data (T)
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
