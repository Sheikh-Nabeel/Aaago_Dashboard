import axiosInstance from './axiosConfig';

class PricingUpdateService {
  static async updateComprehensivePricing(pricingData) {
    try {
      const response = await axiosInstance.put('/admin/comprehensive-pricing/update-all', pricingData);
      return response.data;
    } catch (error) {
      console.error('Error updating comprehensive pricing:', error);
      throw error;
    }
  }

  static async updateGeneralPricing(generalData) {
    try {
      // Extract only general pricing fields
      const updateData = {
        currency: generalData.currency,
        baseFare: generalData.baseFare,
        perKmRate: generalData.perKmRate,
        minimumFare: generalData.minimumFare,
        platformFee: generalData.platformFee,
        cancellationCharges: generalData.cancellationCharges,
        waitingCharges: generalData.waitingCharges,
        nightCharges: generalData.nightCharges,
        surgePricing: generalData.surgePricing,
        vat: generalData.vat
      };

      const response = await axiosInstance.put('/admin/comprehensive-pricing/update-all', updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating general pricing:', error);
      throw error;
    }
  }

  static async updateServiceTypePricing(serviceType, serviceData) {
    try {
      const updateData = {
        serviceTypes: {
          [serviceType]: serviceData
        }
      };

      const response = await axiosInstance.put('/admin/comprehensive-pricing/update-all', updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating ${serviceType} pricing:`, error);
      throw error;
    }
  }

  static async updateCarRecoveryService(serviceData) {
    try {
      const updateData = {
        serviceTypes: {
          carRecovery: serviceData
        }
      };

      const response = await axiosInstance.put('/admin/comprehensive-pricing/update-all', updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating car recovery pricing:', error);
      throw error;
    }
  }

  static async updateShiftingMoversPricing(shiftingData) {
    try {
      const updateData = {
        serviceTypes: {
          shiftingMovers: shiftingData
        }
      };

      const response = await axiosInstance.put('/admin/comprehensive-pricing/update-all', updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating shifting movers pricing:', error);
      throw error;
    }
  }

  static async updateAppointmentServices(appointmentData) {
    try {
      const updateData = {
        appointmentServices: appointmentData
      };

      const response = await axiosInstance.put('/admin/comprehensive-pricing/update-all', updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating appointment services:', error);
      throw error;
    }
  }

  static async updateRoundTripSettings(roundTripData) {
    try {
      const updateData = {
        roundTrip: roundTripData
      };

      const response = await axiosInstance.put('/admin/comprehensive-pricing/update-all', updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating round trip settings:', error);
      throw error;
    }
  }

  // Helper method to validate pricing data before sending
  static validatePricingData(data) {
    const errors = [];

    // Validate required fields
    if (!data.currency) errors.push('Currency is required');
    if (data.minimumFare < 0) errors.push('Minimum fare must be non-negative');
    if (data.baseFare?.amount < 0) errors.push('Base fare amount must be non-negative');
    if (data.baseFare?.coverageKm < 0) errors.push('Base fare coverage must be non-negative');
    if (data.perKmRate?.afterBaseCoverage < 0) errors.push('Per KM rate must be non-negative');
    if (data.platformFee?.percentage < 0 || data.platformFee?.percentage > 100) {
      errors.push('Platform fee percentage must be between 0 and 100');
    }

    // Validate night charges
    if (data.nightCharges?.enabled) {
      if (data.nightCharges.startHour < 0 || data.nightCharges.startHour > 23) {
        errors.push('Night charges start hour must be between 0 and 23');
      }
      if (data.nightCharges.endHour < 0 || data.nightCharges.endHour > 23) {
        errors.push('Night charges end hour must be between 0 and 23');
      }
      if (data.nightCharges.fixedAmount < 0) {
        errors.push('Night charges fixed amount must be non-negative');
      }
      if (data.nightCharges.multiplier < 1) {
        errors.push('Night charges multiplier must be at least 1');
      }
    }

    // Validate surge pricing levels
    if (data.surgePricing?.enabled && data.surgePricing.levels) {
      data.surgePricing.levels.forEach((level, index) => {
        if (level.demandRatio < 1) {
          errors.push(`Surge level ${index + 1}: Demand ratio must be at least 1`);
        }
        if (level.multiplier < 1) {
          errors.push(`Surge level ${index + 1}: Multiplier must be at least 1`);
        }
      });
    }

    return errors;
  }
}

export default PricingUpdateService;
