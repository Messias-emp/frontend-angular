import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.model';

/**
 * Resolver responsável por:
 * 🔹 Buscar um produto específico pelo ID da rota
 * 🔹 Garantir que a tela de detalhes já abra com dados
 */

export const productDetailResolver: ResolveFn<Product> = (route) => {

  // 🔌 Injeta o serviço de produtos
  const productService = inject(ProductService);

  // 🆔 Captura o ID da URL (/produto/:id)
  const id = Number(route.paramMap.get('id'));

  // 🚀 Chamada ao backend

  return productService.findById(id);
}

