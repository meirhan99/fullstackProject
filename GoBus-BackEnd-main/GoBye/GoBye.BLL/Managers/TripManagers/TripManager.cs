﻿using GoBye.BLL.Dtos.QuestionDtos;
using GoBye.BLL.Dtos.ReservationDtos;
using GoBye.BLL.Dtos.TripDtos;
using GoBye.DAL.Data.Models;
using GoBye.DAL.UnitOfWork;
using Hangfire;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GoBye.BLL.Managers.TripManagers
{
    public class TripManager:ITripManager
    {
        private readonly IUnitOfWork _unitOfWork;

        public TripManager(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        #region SearchAsync
        public async Task<Response> SearchAsync(TripSearchDto tripSearchDto)
        {
            IEnumerable<Trip>? trips = await _unitOfWork.TripRepo.SearchAsync();

            if (trips is not null)
            {
                IEnumerable<Trip>? filteredTrips = trips
                .Where(x => x.AvailableSeats >= tripSearchDto.Quantity)
                .Where(x => DateOnly.FromDateTime(x.DepartureDate) == DateOnly.Parse(tripSearchDto.DepartureDate))
                .Where(x => x.DepartureDate > DateTime.Now)
                .Where(x => x.StartBranchId == tripSearchDto.StartBranchId)
                .Where(x => x.EndBranchId == tripSearchDto.EndBranchId)
                .ToList();

                var data = filteredTrips.Select(x => new TripReadDto
                {
                    Id = x.Id,
                    Quantity = tripSearchDto.Quantity,
                    AvailableSeats = x.Bus.Capacity,
                    DepartureDate = x.DepartureDate,
                    ArrivalDate = x.ArrivalDate,
                    BusId = x.BusId,
                    BusClassName = x.Bus.BusClass.Name,
                    StartBranchName = x.StartBranch.Name,
                    EndBranchName = x.EndBranch.Name,
                    Price = x.Price,
                    TotalPrice = x.Price * tripSearchDto.Quantity,
                });
                return _unitOfWork.Response(true, data, null);

            }

            return _unitOfWork.Response(false, null, "There is no Trips");
        }
        #endregion


        #region FilterByDateAsync
        public async Task<Response> FilterByDateAsync(DateOnly date)
        {
            IEnumerable<Trip>? trips = await _unitOfWork.TripRepo.GetAllWithDetailsAsync();

            if (trips is not null)
            {
                IEnumerable<Trip>? filteredTrips = trips
                .Where(x => DateOnly.FromDateTime(x.DepartureDate) == date)
                .ToList();

                var data = filteredTrips.Select(x => new TripDetailsDto
                {
                    Id = x.Id,
                    AvailableSeats = x.AvailableSeats,
                    DepartureDate = x.DepartureDate,
                    ArrivalDate = x.ArrivalDate,
                    BusClassName = x.Bus.BusClass.Name,
                    BusId = x.Bus.Id,
                    BusNumber = x.Bus.Number,
                    StartBranchName = x.StartBranch.Name,
                    StartBranchId = x.StartBranch.Id,
                    EndBranchName = x.EndBranch.Name,
                    EndBranchId = x.EndBranch.Id,
                    Price = x.Price,
                    ReservationReadDtos = x.Reservations.Select(y => new ReservationReadDto
                    {
                        Id = y.Id,
                        Quantity = y.Quantity,
                        TotalPrice = y.TotalPrice,
                        Date = y.Date,
                        UserId = y.UserId,
                        UserName = y.User.UserName!,
                        SeatNumbers = y.Tickets.Select(z => z.SeatNumber).ToList(),
                    }).ToList(),
                });
                return _unitOfWork.Response(true, data, null);

            }

            return _unitOfWork.Response(false, null, "There is no Trips");
        }

        #endregion


        #region GetAllWithDetailsAsync
        public async Task<Response> GetAllWithDetailsAsync()
        {
            IEnumerable<Trip>? trips = await _unitOfWork.TripRepo.GetAllWithDetailsAsync();
            if (trips is not null)
            {
                var data = trips.Select(x => new TripDetailsDto
                {
                    Id = x.Id,
                    AvailableSeats = x.AvailableSeats,
                    DepartureDate = x.DepartureDate,
                    ArrivalDate = x.ArrivalDate,
                    BusClassName = x.Bus.BusClass.Name,
                    BusId = x.Bus.Id,
                    BusNumber = x.Bus.Number,
                    StartBranchName = x.StartBranch.Name,
                    StartBranchId = x.StartBranch.Id,
                    EndBranchName = x.EndBranch.Name,
                    EndBranchId = x.EndBranch.Id,
                    Price = x.Price,
                    ReservationReadDtos = x.Reservations.Select(y => new ReservationReadDto
                    {
                        Id = y.Id,
                        Quantity = y.Quantity,
                        TotalPrice = y.TotalPrice,
                        Date = y.Date,
                        UserId = y.UserId,
                        UserName = y.User.UserName!,
                        SeatNumbers = y.Tickets.Select(z => z.SeatNumber).ToList(),
                    }).ToList(),
                });
                return _unitOfWork.Response(true, data, null);

            }

            return _unitOfWork.Response(false, null, "There is no Trips");
        }
        #endregion


        #region GetByIdWithBusClassNameAsync
        public async Task<Response> GetByIdWithBusClassNameAsync(int id)
        {
            Trip? trip = await _unitOfWork.TripRepo.GetByIdWithBusClassNameAsync(id);

            if (trip is not null)
            {
                var data = new TripUserDto
                {

                    Id = trip.Id,
                    AvailableSeats = trip.AvailableSeats,
                    DepartureDate = trip.DepartureDate,
                    ArrivalDate = trip.ArrivalDate,
                    BusId = trip.BusId,
                    BusClassName = trip.Bus.BusClass.Name,
                    StartBranchName = trip.StartBranch.Name,
                    EndBranchName = trip.EndBranch.Name,
                    Price = trip.Price,
                };
                return _unitOfWork.Response(true, data, null);
            }

            return _unitOfWork.Response(false, null, $"Trip is not found");
        }
        #endregion


        #region AddAsync
        public async Task<Response> AddAsync(TripAddDto tripAddDto)
        {
            Trip trip = new Trip
            {
                DepartureDate = tripAddDto.DepartureDate,
                ArrivalDate = tripAddDto.ArrivalDate,
                Price = tripAddDto.Price,
                BusId = tripAddDto.BusId,
                StartBranchId = tripAddDto.StartBranchId,
                EndBranchId = tripAddDto.EndBranchId,
            };

            await _unitOfWork.TripRepo.AddAsync(trip);
            bool result = await _unitOfWork.SaveChangesAsync() > 0;
            if (result)
            {
                Trip? tripDb = await _unitOfWork.TripRepo.GetByIdWithBusClassNameAsync(trip.Id);
                if(tripDb is not null)
                {
                    tripDb.AvailableSeats = tripDb.Bus.Capacity;

                    BackgroundJob.Schedule(() => BusStatus1(tripDb.BusId, tripDb.EndBranch.Name.ToString()), trip.DepartureDate);
                    BackgroundJob.Schedule(() => BusStatus2(tripDb.BusId, tripDb.EndBranch.Name.ToString()), trip.ArrivalDate);

                    bool hangFireHandling = await _unitOfWork.SaveChangesAsync() > 0;
                    if (hangFireHandling)
                    {
                        return _unitOfWork.Response(true, null, "The Trip has been added successfully");
                    }
                }
            }
            _unitOfWork.TripRepo.Delete(trip);
            await _unitOfWork.SaveChangesAsync();
            return _unitOfWork.Response(false, null, "Failed to add Trip");
        }

        public async Task BusStatus1(int id, string currentBranch)
        {
            Bus? bus = await _unitOfWork.BusRepo.GetByIdAsync(id);
            bus!.Available = false;
            bus!.CurrentBranch = "Enroute";
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task BusStatus2(int id, string currentBranch)
        {
            Bus? bus = await _unitOfWork.BusRepo.GetByIdAsync(id);
            bus!.Available = true;
            bus!.CurrentBranch = currentBranch;
            await _unitOfWork.SaveChangesAsync();
        }
        #endregion


        #region UpdateAsync
        public async Task<Response> UpdateAsync(int id, TripUpdateDto tripUpdateDto)
        {
            Trip? trip = await _unitOfWork.TripRepo.GetByIdAsync(id);
            if (trip is not null)
            {
                trip.DepartureDate = tripUpdateDto.DepartureDate;
                trip.ArrivalDate = tripUpdateDto.ArrivalDate;
                trip.Price = tripUpdateDto.Price;
                trip.BusId = tripUpdateDto.BusId;
                trip.StartBranchId = tripUpdateDto.StartBranchId;
                trip.EndBranchId = tripUpdateDto.EndBranchId;

                bool result = await _unitOfWork.SaveChangesAsync() > 0;

                if (result)
                {
                    Trip? trip1 = await _unitOfWork.TripRepo.GetByIdWithBusClassNameAsync(trip.Id);
                    if (trip1 is not null)
                    {
                        trip1.AvailableSeats = trip1.Bus.Capacity;
                        result = await _unitOfWork.SaveChangesAsync() > 0 || trip1!.AvailableSeats == trip1.Bus.Capacity; ;
                        if (result)
                        {
                            return _unitOfWork.Response(true, null, "The Trip has been updated successfully");
                        }
                    }
                }
            }
            return _unitOfWork.Response(false, null, "Failed to update Trip");

        }
        #endregion


        #region DeleteAsync
        public async Task<Response> DeleteAsync(int id)
        {
            Trip? trip = await _unitOfWork.TripRepo.GetByIdAsync(id);

            if (trip is not null)
            {
                _unitOfWork.TripRepo.Delete(trip);
                bool result = await _unitOfWork.SaveChangesAsync() > 0;
                if (result)
                {
                    return _unitOfWork.Response(true, null, "The Trip has been deleted successfully");
                }
                return _unitOfWork.Response(false, null, "Failed to delete Trip");
            }
            return _unitOfWork.Response(false, null, $"Trip is not found");
        }
        #endregion
    }
}
