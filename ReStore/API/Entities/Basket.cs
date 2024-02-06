using API.Controllers;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
                return;
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(int productId, int quantity = 1)
        {
            var item = Items.FirstOrDefault(basketItem => basketItem.ProductId == productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item);
        }

        public BasketDto MapBasketToDto()
        {
            return new BasketDto
            {
                Id = this.Id,
                BuyerId = this.BuyerId,
                Items = this.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.Product.Id,
                    Name = item.Product.Name, // Add product name property
                    Price = item.Product.Price, // Add product price property
                    Quantity = item.Quantity,
                    PictureUrl = item.Product.PictureUrl

                }).ToList()
            };
        }

    }
}
