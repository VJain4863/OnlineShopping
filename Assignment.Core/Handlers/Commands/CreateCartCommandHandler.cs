using MediatR;
using Assignment.Contracts.Data;
using Assignment.Contracts.DTO;
using Assignment.Contracts.Data.Entities;
using FluentValidation;
using System.Text.Json;
using Assignment.Core.Exceptions;
using Microsoft.AspNetCore.Identity;

namespace Assignment.Providers.Handlers.Commands
{
    public class CreateCartCommand : IRequest<int>
    {
        public CreateCartDTO Model { get; }
        public CreateCartCommand(CreateCartDTO model)
        {
            this.Model = model;
        }
    }

    public class CreateCartCommandHandler : IRequestHandler<CreateCartCommand, int>
    {
        private readonly IUnitOfWork _repository;
        private readonly IValidator<CreateCartDTO> _validator;

        public CreateCartCommandHandler(IUnitOfWork repository, IValidator<CreateCartDTO> validator)
        {
            _repository = repository;
            _validator = validator;
        }

        public async Task<int> Handle(CreateCartCommand request, CancellationToken cancellationToken)
        {
            CreateCartDTO model = request.Model;

            var result = _validator.Validate(model);

            if (!result.IsValid)
            {
                var errors = result.Errors.Select(x => x.ErrorMessage).ToArray();
                throw new InvalidRequestBodyException
                {
                    Errors = errors
                };
            }


            var entity = new Cart
            {
                ProductId = model.ProductId,
                ProductName = model.ProductName,
                ProductCategory = model.ProductCategory,
                ProductPrice = model.ProductPrice,
                CartStatus = model.CartStatus,
                ProductQuantity = model.ProductQuantity,
                ProductImage = model.ProductImage,
                UserName=model.UserName
            };
            _repository.Cart.Add(entity);
            await _repository.CommitAsync();

            return entity.Id;
        }
    }
}