import { useState } from "react";

import PageHeader from "../components/PageHeader";
import PrimaryButton from "../components/PrimaryButton";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";

import { useBalance } from "../context/BalanceContext";

import BalanceSummaryCard from "../features/balance/BalanceSummaryCard";
import MonthlyInsightsCard from "../features/balance/MonthlyInsightsCard";
import TransactionsHistory from "../features/balance/TransactionsHistory";
import RecurringIncomeCard from "../features/balance/RecurringIncomeCard";
import { RecurringIncomeModal } from "../features/balance/RecurringIncomeModal";
import RecurringExpenseCard from "../features/balance/RecurringExpenseCard";
import { RecurringExpenseModal } from "../features/balance/RecurringExpenseModal";
import MovementModal from "../features/balance/MovementModal";
import { getBalanceSummary } from "../domain/balanceCalculations";
import { generateMonthlyInsights } from "../domain/insightsCalculations";

export default function Balance() {
  const balanceContext = useBalance();

  // Protección por si el contexto o balance tardan en cargar o vienen vacíos
  const balance = balanceContext?.balance || {
    movements: [],
    recurringIncome: [],
    recurringExpense: [],
  };

  const {
    createMovement,
    editMovement,
    removeMovement,
    createRecurringIncome,
    editRecurringIncome,
    removeRecurringIncome,
    createRecurringExpense,
    editRecurringExpense,
    removeRecurringExpense,
  } = balanceContext || {};

  const summary = getBalanceSummary(balance);

  const [showRecurringIncomeModal, setShowRecurringIncomeModal] =
    useState(false);

  const [showRecurringExpenseModal, setShowRecurringExpenseModal] =
    useState(false);

  const [showMovementModal, setShowMovementModal] =
    useState(false);

  const [editingMovement, setEditingMovement] =
    useState(null);

  const [movementToDelete, setMovementToDelete] =
    useState(null);

  const [editingRecurringIncome, setEditingRecurringIncome] =
    useState(null);

  const [recurringIncomeToDelete, setRecurringIncomeToDelete] =
    useState(null);

  const [editingRecurringExpense, setEditingRecurringExpense] =
    useState(null);

  const [recurringExpenseToDelete, setRecurringExpenseToDelete] =
    useState(null);

  const [targetSavings, setTargetSavings] = useState(300);

  const insights = generateMonthlyInsights(balance, targetSavings);

  function handleNewMovement() {
    setEditingMovement(null);
    setShowMovementModal(true);
  }

  return (
    <div className="space-y-8">

      <PageHeader
        title="Balance"
        description="Comprende realmente qué ocurre con tu dinero."
        action={
          <PrimaryButton onClick={handleNewMovement}>
            Nuevo movimiento
          </PrimaryButton>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="space-y-6 xl:col-span-2">

          <BalanceSummaryCard
            summary={summary}
          />

          <MonthlyInsightsCard
            insights={insights}
            targetSavings={targetSavings}
            onTargetChange={setTargetSavings}
          />

          <TransactionsHistory
            movements={balance.movements}
            onEdit={(movement) => {
              setEditingMovement(movement);
              setShowMovementModal(true);
            }}
            onDelete={(id) => {
              setMovementToDelete(id);
            }}
          />

        </div>

        <div className="space-y-6">

          <RecurringIncomeCard
            recurringIncome={balance.recurringIncome}
            onAdd={() => {
              setEditingRecurringIncome(null);
              setShowRecurringIncomeModal(true);
            }}
            onEdit={(income) => {
              setEditingRecurringIncome(income);
              setShowRecurringIncomeModal(true);
            }}
            onDelete={(id) => {
              setRecurringIncomeToDelete(id);
            }}
          />

          <RecurringExpenseCard
            recurringExpense={balance.recurringExpense}
            onAdd={() => {
              setEditingRecurringExpense(null);
              setShowRecurringExpenseModal(true);
            }}
            onEdit={(expense) => {
              setEditingRecurringExpense(expense);
              setShowRecurringExpenseModal(true);
            }}
            onDelete={(id) => {
              setRecurringExpenseToDelete(id);
            }}
          />

        </div>

      </div>

      <Modal
        open={showRecurringIncomeModal}
        onClose={() => {
          setEditingRecurringIncome(null);
          setShowRecurringIncomeModal(false);
        }}
      >
        <RecurringIncomeModal
          recurringIncome={editingRecurringIncome}
          onClose={() => {
            setEditingRecurringIncome(null);
            setShowRecurringIncomeModal(false);
          }}
          onSubmit={(income) => {
            if (editingRecurringIncome) {
              editRecurringIncome?.(income);
            } else {
              createRecurringIncome?.(income);
            }

            setEditingRecurringIncome(null);
            setShowRecurringIncomeModal(false);
          }}
        />
      </Modal>

      <Modal
        open={showRecurringExpenseModal}
        onClose={() => {
          setEditingRecurringExpense(null);
          setShowRecurringExpenseModal(false);
        }}
      >
        <RecurringExpenseModal
          recurringExpense={editingRecurringExpense}
          onClose={() => {
            setEditingRecurringExpense(null);
            setShowRecurringExpenseModal(false);
          }}
          onSubmit={(expense) => {
            if (editingRecurringExpense) {
              editRecurringExpense?.(expense);
            } else {
              createRecurringExpense?.(expense);
            }

            setEditingRecurringExpense(null);
            setShowRecurringExpenseModal(false);
          }}
        />
      </Modal>

      <Modal
        open={showMovementModal}
        onClose={() => {
          setEditingMovement(null);
          setShowMovementModal(false);
        }}
      >
        <MovementModal
          movement={editingMovement}
          onSubmit={(movement) => {
            if (editingMovement) {
              editMovement?.(movement);
            } else {
              createMovement?.(movement);
            }

            setEditingMovement(null);
            setShowMovementModal(false);
          }}
        />
      </Modal>

      <ConfirmModal
        open={movementToDelete !== null}
        onClose={() => setMovementToDelete(null)}
        onConfirm={() => {
          removeMovement?.(movementToDelete);
          setMovementToDelete(null);
        }}
        title="Eliminar movimiento"
        message="Esta acción no se puede deshacer. ¿Quieres eliminar este movimiento?"
      />

      <ConfirmModal
        open={recurringIncomeToDelete !== null}
        onClose={() => setRecurringIncomeToDelete(null)}
        onConfirm={() => {
          removeRecurringIncome?.(recurringIncomeToDelete);
          setRecurringIncomeToDelete(null);
        }}
        title="Eliminar ingreso recurrente"
        message="Esta acción no se puede deshacer. ¿Quieres eliminar este ingreso recurrente?"
      />

      <ConfirmModal
        open={recurringExpenseToDelete !== null}
        onClose={() => setRecurringExpenseToDelete(null)}
        onConfirm={() => {
          removeRecurringExpense?.(recurringExpenseToDelete);
          setRecurringExpenseToDelete(null);
        }}
        title="Eliminar gasto recurrente"
        message="Esta acción no se puede deshacer. ¿Quieres eliminar este gasto recurrente?"
      />

    </div>
  );
}