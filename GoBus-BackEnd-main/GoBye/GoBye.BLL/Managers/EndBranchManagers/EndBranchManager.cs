﻿using GoBye.BLL.Dtos.BusDtos;
using GoBye.BLL.Dtos.EndBranchDtos;
using GoBye.BLL.Dtos.StartBranchDtos;
using GoBye.DAL.Data.Models;
using GoBye.DAL.Repos.BusRepo;
using GoBye.DAL.Repos.EndBranchRepo;
using GoBye.DAL.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GoBye.BLL.Managers.EndBranchManagers
{
    public class EndBranchManager: IEndBranchManager
    {
        private readonly IUnitOfWork _unitOfWork;

        public EndBranchManager(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        #region GetAllWithDestinationNameAsync
        public async Task<Response> GetAllWithDestinationNameAsync()
        {
            IEnumerable<EndBranch>? endBranches = await _unitOfWork.EndBranchRepo.GetAllWithDestinationNameAsync();
            if (endBranches is not null)
            {
                var data = endBranches.Select(x => new EndBranchWithDestinationNameDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Address = x.Address,
                    Phone = x.Phone,
                    DestinationName = x.Destination.Name,
                    DestinationId = x.Destination.Id

                });
                return _unitOfWork.Response(true, data, null);

            }

            return _unitOfWork.Response(false, null, "There is no Branches");

        }
        #endregion


        #region GetAllByDestinationIdAsync
        public async Task<Response> GetAllByDestinationIdAsync(int id)
        {
            IEnumerable<EndBranch>? endBranches = await _unitOfWork.EndBranchRepo.GetAllByDestinationIdAsync(id);
            if (endBranches is not null)
            {
                var data = endBranches.Select(x => new EndBranchReadDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Address = x.Address,
                    Phone = x.Phone,
                    DestinationName =x.Destination.Name
                });
                return _unitOfWork.Response(true, data, null);

            }

            return _unitOfWork.Response(false, null, $"There is no Branches with destinationId ({id})");

        }
        #endregion


        #region FilterEndBranchesByStartBranchDestinationIdAsync
        public async Task<Response> FilterEndBranchesByStartBranchDestinationIdAsync(int id)
        {
            IEnumerable<EndBranch>? endBranches = await _unitOfWork.EndBranchRepo.FilterEndBranchesByStartBranchDestinationIdAsync(id);
            if (endBranches is not null)
            {
                var data = endBranches.Select(x => new EndBranchReadDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Address = x.Address,
                    Phone = x.Phone,
                });
                return _unitOfWork.Response(true, data, null);

            }

            return _unitOfWork.Response(false, null, $"There is no Branches with destinationId ({id})");

        }
        #endregion


        #region GetByIdWithDestinationNameAsync
        public async Task<Response> GetByIdWithDestinationNameAsync(int id)
        {
            EndBranch? endBranch = await _unitOfWork.EndBranchRepo.GetByIdWithDestinationNameAsync(id);
            if (endBranch is not null)
            {
                var data = new EndBranchWithDestinationNameDto
                {
                    Id = endBranch.Id,
                    Name = endBranch.Name,
                    Address = endBranch.Address,
                    Phone = endBranch.Phone,
                    DestinationId = endBranch.DestinationId,
                    DestinationName = endBranch.Destination.Name
                };
                return _unitOfWork.Response(true, data, null);
            }

            return _unitOfWork.Response(false, null, $"Branch with id ({id}) is not found");
        }
        #endregion


        #region AddAsync
        public async Task<Response> AddAsync(EndBranchAddDto endBranchAddDto)
        {
            EndBranch endBranch = new EndBranch
            {
                Name = endBranchAddDto.Name,
                Address = endBranchAddDto.Address,
                Phone = endBranchAddDto.Phone,
                DestinationId = endBranchAddDto.DestinationId,
            };
            StartBranch startBranch = new StartBranch
            {
                Name = endBranchAddDto.Name,
                Address = endBranchAddDto.Address,
                Phone = endBranchAddDto.Phone,
                DestinationId = endBranchAddDto.DestinationId,
            };
            await _unitOfWork.EndBranchRepo.AddAsync(endBranch);
            await _unitOfWork.StartBranchRepo.AddAsync(startBranch);
            bool result = await _unitOfWork.SaveChangesAsync() > 0;
            if (result)
            {
                return _unitOfWork.Response(true, null, "The Branch has been added successfully");
            }
            return _unitOfWork.Response(false, null, "Failed to add Branch");
        }
        #endregion


        #region UpdateAsync
        public async Task<Response> UpdateAsync(int id, EndBranchUpdateDto endBranchUpdateDto)
        {
            StartBranch? startBranch = await _unitOfWork.StartBranchRepo.GetByIdAsync(id);
            EndBranch? endBranch = await _unitOfWork.EndBranchRepo.GetByIdAsync(id);
            if (startBranch is not null && endBranch is not null)
            {
                startBranch.Name = endBranchUpdateDto.Name;
                startBranch.Address = endBranchUpdateDto.Address;
                startBranch.Phone = endBranchUpdateDto.Phone;
                startBranch.DestinationId = endBranchUpdateDto.DestinationId;

                endBranch.Name = endBranchUpdateDto.Name;
                endBranch.Address = endBranchUpdateDto.Address;
                endBranch.Phone = endBranchUpdateDto.Phone;
                endBranch.DestinationId = endBranchUpdateDto.DestinationId;
            }
            bool result = await _unitOfWork.SaveChangesAsync() > 0;
            if (result)
            {
                return _unitOfWork.Response(true, null, "The Branch has been updated successfully");
            }
            return _unitOfWork.Response(false, null, "Failed to update Branch");
        }
        #endregion


        #region DeleteAsync
        public async Task<Response> DeleteAsync(int id)
        {
            EndBranch? endBranch = await _unitOfWork.EndBranchRepo.GetByIdAsync(id);
            StartBranch? startBranch = await _unitOfWork.StartBranchRepo.GetByIdAsync(id);
            if (endBranch is not null && startBranch is not null)
            {
                _unitOfWork.EndBranchRepo.Delete(endBranch);
                _unitOfWork.StartBranchRepo.Delete(startBranch);
                bool result = await _unitOfWork.SaveChangesAsync() > 0;
                if (result)
                {
                    return _unitOfWork.Response(true, null, "The Branch has been deleted successfully");
                }
                return _unitOfWork.Response(false, null, "Failed to delete Branch");
            }
            return _unitOfWork.Response(false, null, $"Branch with id ({id}) is not found");
        }
        #endregion
    }
}
